using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;
using MovieTime.Web.Movie.Persistance;
using MovieTime.Web.Movie.Repositories;
using MovieTime.Web.Movie.Services;
using MovieTime.Web.Users;
using MovieTime.Web.Utilities;

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
            services.AddMvc(setupAction =>
            {
                setupAction.ReturnHttpNotAcceptable = true; // do not send default media type if unsupported is requested
                setupAction.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter());
            });

            services.AddAutoMapper();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "MovieTime API", Version = "v1" });
            });
            
            // Exec: dotnet ef migrations add "<migration_name>", to add a new migration.
            // Exec: dotnet ef database update, to update the database according to the migrations. 
            var connectionString = Configuration.GetConnectionString("movieDbConnectionString");
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
            services.AddScoped<IDatabaseMovieRespository, DatabaseMovieRepository>();
            // For now decide here if we use omdb or tmdb as movie repository.
            services.AddScoped<IMovieRepository, OmdbMovieRepository>();
            
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            
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
            }
            else
            {
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

            app.UseMiddleware<SerilogMiddleware>();

            app.UseStaticFiles();

            movieContext.EnsureSeedDataForContext();

            app.UseSwagger();

            if (env.IsDevelopment())
            {
               
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MovieTime API V1");
                });
            }

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
