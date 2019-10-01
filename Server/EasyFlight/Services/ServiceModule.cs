using EasyFlight.Services.Cities;
using EasyFlight.Services.Countries;
using Microsoft.Extensions.DependencyInjection;

namespace EasyFlight.Services
{
    public static class ServiceModule
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<ICityService, CityService>();
            services.AddSingleton<ICountryService, CountryService>();
        }
    }
}