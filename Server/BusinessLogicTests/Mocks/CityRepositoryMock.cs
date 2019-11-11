using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Cities;

namespace BusinessLogicTests.Mocks
{
    public class CityRepositoryMock : ICityRepository
    {
        private readonly List<CityEntity> _citiesData = new List<CityEntity>()
        {
            new CityEntity() { Id = 1, Name = "Minsk", CountryId = 1 },
            new CityEntity() { Id = 2, Name = "Kiev", CountryId = 2 }
        };
        
        private readonly List<AirportEntity> _airportsData = new List<AirportEntity>();

        public async Task<IReadOnlyCollection<CityEntity>> GetAllAsync()
        {
            return _citiesData;
        }

        public async Task<IReadOnlyCollection<CityEntity>> SearchByNameAsync(string nameFilter)
        {
            return _citiesData;
        }

        public async Task<CityEntity> GetAsync(int id)
        {
            return _citiesData.FirstOrDefault(x => x.Id == id);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetCityAirportsAsync(int id)
        {
            return _airportsData;
        }

        public async Task<IReadOnlyCollection<AirportEntity>> SearchCityAirportsByNameAsync(
            int cityId,
            string nameFilter
        )
        {
            return _airportsData;
        }

        public async Task<int> AddAsync(CityEntity city)
        {
            return 0;
        }

        public async Task UpdateAsync(CityEntity city)
        {
            // implementation
        }

        public async Task<bool> CheckDuplicateAsync(CityEntity city)
        {
            CityEntity duplicate =
                _citiesData.FirstOrDefault(x => x.Name == city.Name && x.CountryId == city.CountryId);

            return duplicate != null;
        }
    }
}