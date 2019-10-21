using DataAccessLayer.Repositories.Cities;
using DataAccessLayer.Repositories.Countries;
using DataAccessLayer.Repositories.Airports;
using DataAccessLayer.Repositories.Accounts;
using DataAccessLayer.Repositories.Airplanes;
using Microsoft.Extensions.DependencyInjection;

namespace DataAccessLayer
{
    public static class DalModule
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<ICityRepository, CityRepository>();
            services.AddSingleton<ICountryRepository, CountryRepository>();
            services.AddSingleton<IAirportRepository, AirportRepository>();
            services.AddSingleton<IAccountRepository, AccountRepository>();
            services.AddSingleton<IAirplaneRepository, AirplaneRepository>();
        }
    }
}