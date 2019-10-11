using BusinessLayer.Services.Cities;
using BusinessLayer.Services.Countries;
using BusinessLayer.Services.Airports;
using BusinessLayer.Services.Accounts;
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
            services.AddSingleton<IAccountService, AccountService>();
        }
    }
}