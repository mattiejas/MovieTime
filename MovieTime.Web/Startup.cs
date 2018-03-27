using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;
using MovieTime.Web.Users;
using MovieTime.Web.Utilities;
using MovieTime.Web.Database;
using MovieTime.Web.Movies;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using MovieTime.Web.Reviews;
using MovieTime.Web.TrackedMovies;

namespace MovieTime.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://securetoken.google.com/movietime-hhs-c73b9";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "https://securetoken.google.com/movietime-hhs-c73b9",
                        ValidateAudience = true,
                        ValidAudience = "movietime-hhs-c73b9",
                        ValidateLifetime = true
                    };
                });

            services.AddMvc(setupAction =>
            {
                setupAction.ReturnHttpNotAcceptable =
                    true; // do not send default media type if unsupported type is requested
                setupAction.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
                setupAction.InputFormatters.Add(new XmlDataContractSerializerInputFormatter());
            });

            services.AddAutoMapper();
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info {Title = "MovieTime API", Version = "v1"}); });

            var connectionString = Configuration.GetConnectionString("defaultConnection");
            var mode = Configuration.GetConnectionString("Use_SQLServer");
            if (string.IsNullOrWhiteSpace(mode) || mode.ToLower() == "true")
            {
                services.AddDbContext<MovieContext>(options => options.UseSqlServer(connectionString));
            }
            else
            {
                connectionString = Configuration.GetConnectionString("Postgresql_DATABASE_URL");
                services.AddDbContext<MovieContext>(options => options.UseNpgsql(connectionString));
            }

            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IMovieRespository, MovieRepository>();
            // For now decide here if we use omdb or tmdb as movie repository.
            services.AddScoped<IThirdPartyMovieRepository, OmdbMovieRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IReviewService, ReviewService>();
            services.AddScoped<IReviewRepository, ReviewRepository>();

            services.AddScoped<ITrackService, TrackService>();
            services.AddScoped<ITrackRepository, TrackRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, MovieContext movieContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });

                var setDbToInitialState = Configuration.GetConnectionString("clear_local_db");
                if (string.IsNullOrWhiteSpace(setDbToInitialState) || setDbToInitialState.ToLower() == "true")
                {
                    movieContext.SeedContextWithoutMigration(env);
                    // You can also use SeedContext() to use migrations instead of EnsureCreated().
                    // movieContext.SeedContext(env);
                }
            }
            else
            {
                StartMigration(movieContext);
                
                app.UseMiddleware<SerilogMiddleware>();
                //app.UseExceptionHandler("/Home/Error");
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
                    });
                });
            }

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSwagger();

            if (env.IsDevelopment())
            {
                app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "MovieTime API V1"); });
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {controller = "Home", action = "Index"});
            });
        }

        /**
         * Applies all pending migrations automatically.
         *
         * Instructions:
         * In order to update the database, you have to create a migration first.
         * One of the possible approach for this project is to create migration in the master branch before deploying it.
         * 
         * The instructions to create a new migration:
         * ----------------------------------------------------------
         * cd ....MovieTime.Web (locate to the web project)
         * dotnet restore
         * dotnet ef migrations add <Name_Migration>
         * ----------------------------------------------------------
         *
         * In the migration folder, the <name_migration> shows down and up methods.
         * If both methods are empty, migration can be deleted since no changes in entities occured.
         * ----------------------------------------------------------
         * dotnet ef migrations remove
         * ----------------------------------------------------------
         *
         * The migration will be applied by this method. So there is no need to call 'dotnet ef database update' command.
         *
         * Todo: In production, it's recommended to run migration scripts instead.
         */
        private void StartMigration(MovieContext movieContext)
        {
            movieContext.Database.Migrate();
        }
    }
}