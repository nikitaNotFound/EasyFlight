using BusinessLayer.Services.Cities;
using BusinessLayer.Services.Countries;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLayer
{
    public static class BlModule
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<ICityService, CityService>();
            services.AddSingleton<ICountryService, CountryService>();
            services.AddSingleton<IAirportService, AirportService>();
        }
    }
}