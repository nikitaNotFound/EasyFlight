using DataAccessLayer.Repositories.Cities;
using DataAccessLayer.Repositories.Countries;
using DataAccessLayer.Repositories.Airports;
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
        }
    }
}