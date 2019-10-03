using EasyFlight.Services.Cities;
using EasyFlight.Services.Countries;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLayer
{
    public static class BlModule
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<ICityService, CityService>();
            services.AddSingleton<ICountryService, CountryService>();
        }
    }
}