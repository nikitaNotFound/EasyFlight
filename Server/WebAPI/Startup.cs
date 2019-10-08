﻿using Microsoft.AspNetCore.Builder;
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
        public IConfiguration Configuration { get; }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            Settings settings = new Settings(Configuration);

            services.AddSingleton<IDalSettings>(settings);

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder =>
                    {
                        builder.WithOrigins(settings.AppUrl)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                WebAPIMapping.Initialize(config);
                BlMapping.Initialize(config);
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
            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}