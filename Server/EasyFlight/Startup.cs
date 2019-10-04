using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DataAccessLayer;
using BusinessLayer;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            settings = new Settings(Configuration);
        }

        public IConfiguration Configuration { get; }

        Settings settings;
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IDalSettings>(settings);


            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllToUrlFromConfig",
                    builder =>
                    {
                        builder.WithOrigins(settings.FriendlyUrl)
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
            app.UseRouting();
            app.UseCors("AllowAllToUrlFromConfig");

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}