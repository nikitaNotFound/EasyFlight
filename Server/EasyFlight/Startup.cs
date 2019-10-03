using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Errors;
using DataAccessLayer;
using BusinessLayer;
using AutoMapper;

namespace WebAPI
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
            Settings settings = new Settings(Configuration);
            services.AddSingleton<Settings>(settings);


            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllToUrlsFromConfig",
                    builder =>
                    {
                        builder.WithOrigins(settings.FriendlyUrls)
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                    });
            });


            var mappingConfig = new MapperConfiguration(config =>
            {
                WebAPIMapping.Initialize(config);
                BlMapping.Initialize(config);
                DalMapping.Initialize(config);
            });
            mappingConfig.CompileMappings();

            services.AddSingleton<IMapper>(provider => mappingConfig.CreateMapper());


            services.AddControllers();

            DalModule.Register(services);
            BlModule.Register(services);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseErrorHandler();
            app.UseRouting();
            app.UseCors("AllowAllToUrlsFromConfig");

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}