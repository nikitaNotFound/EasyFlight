using EasyFlight.Repositories.Cities;
using EasyFlight.Repositories.Countries;
using Microsoft.Extensions.DependencyInjection;

namespace EasyFlight.Repositories
{
    public static class RepositoryModule
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<ICityRepository, CityRepository>();
            services.AddSingleton<ICountryRepository, CountryRepository>();
        }
    }
}