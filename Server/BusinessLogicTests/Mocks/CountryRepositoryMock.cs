using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Countries;

namespace BusinessLogicTests.Mocks
{
    public class CountryRepositoryMock : ICountryRepository
    {
        private readonly IReadOnlyCollection<CountryEntity> _countriesData = new List<CountryEntity>()
        {
            new CountryEntity() { Id = 1, Name = "Belarus" },
            new CountryEntity() { Id = 2, Name = "Ukraine" }
        };
        
        private readonly IReadOnlyCollection<CityEntity> _citiesData = new List<CityEntity>();
        
        public async Task<IReadOnlyCollection<CountryEntity>> GetAllAsync()
        {
            return _countriesData;
        }

        public async Task<CountryEntity> GetAsync(int id)
        {
            return _countriesData.FirstOrDefault(x => x.Id == id);
        }

        public async Task<IReadOnlyCollection<CountryEntity>> SearchByNameAsync(string name)
        {
            return _countriesData;
        }

        public async Task<IReadOnlyCollection<CityEntity>> GetCountryCitiesAsync(int countryId)
        {
            return _citiesData;
        }

        public async Task<IReadOnlyCollection<CityEntity>> SearchCountryCitiesByNameAsync(int countryId, string name)
        {
            return _citiesData;
        }

        public async Task<int> AddAsync(CountryEntity country)
        {
            return 0;
        }

        public async Task UpdateAsync(CountryEntity country)
        {
            // implementation
        }

        public async Task<bool> CheckDuplicateAsync(CountryEntity country)
        {
            CountryEntity duplicate = _countriesData.FirstOrDefault(x => x.Name == country.Name);

            return duplicate != null;
        }
    }
}