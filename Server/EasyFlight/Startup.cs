using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using EasyFlight.Errors;
using DataAccessLayer;
using BusinessLayer;

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

            services.AddControllers();

            DalModule.Register(services);
            BlModule.Register(services);

            services.AddSingleton<Settings>(provider => new Settings(Configuration));

            services.AddSingleton<ErrorsHandler>(provider => new ErrorsHandler());
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