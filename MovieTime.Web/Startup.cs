using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MovieTime.Web.SharedKernel;
using MovieTime.Web.MovieDetails;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
						services.AddAuthentication( JwtBearerDefaults.AuthenticationScheme)
								.AddJwtBearer( options => {
										options.TokenValidationParameters = new TokenValidationParameters
										{
												ValidateIssuer= true, 
												ValidateAudience = true,
												ValidateIssuerSigningKey = true,
												ValidIssuer = "movietime-hhs-c73b9.firebaseapp.com",
												ValidAudience= "movietime-hhs-c73b9.firebase.com",
												IssuerSigningKey= new SymmetricSecurityKey(
																Encoding.UTF8.GetBytes(Configuration["firebaseKey"]))

										};
								} );

            services.AddMvc();
            services.AddAutoMapper();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "MovieTime API", Version = "v1" });
            });
            services.AddTransient<IMovieService, MovieService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseMiddleware<SerilogMiddleware>();

            app.UseStaticFiles();

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
