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
using EasyFlight.Models;
using EasyFlight.Models.Cities;
using EasyFlight.Models.Countries;

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
                options.AddDefaultPolicy(
                    builder =>
                    {

                        builder.WithOrigins("http://localhost:3000",
                                            "http://www.contoso.com");
                    });

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

            string connectString = @"Server=np:\\.\pipe\LOCALDB#5186F99E\tsql\query;Initial Catalog=easyflight;Integrated Security=True";
            services.AddSingleton<IRepository<City, CitySearchOptions>, CityRepository>(provider => new CityRepository(connectString));
            services.AddSingleton<IRepository<Country, CountrySearchOptions>, CountryRepository>(provider => new CountryRepository(connectString));
        }

        public void Configure(IApplicationBuilder app)
        {
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
