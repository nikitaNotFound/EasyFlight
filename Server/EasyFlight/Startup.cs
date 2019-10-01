using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using EasyFlight.Repositories;
using EasyFlight.Services;
using EasyFlight.Errors;

namespace EasyFlight
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyHeaderAndMethod",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddControllers();

            RepositoryModule.Register(services);
            ServiceModule.Register(services);

            Settings settings = new Settings(Configuration);
            services.AddSingleton<Settings>(settings);

            ErrorsHandler errorsHandler = new ErrorsHandler();
            services.AddSingleton<ErrorsHandler>(provider => errorsHandler);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseErrorHandler();
            app.UseRouting();
            app.UseCors("AllowAnyHeaderAndMethod");

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
