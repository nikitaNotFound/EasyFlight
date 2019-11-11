using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Airports;

namespace BusinessLogicTests.Mocks
{
    public class AirportRepositoryMock : IAirportRepository
    {
        private readonly List<AirportEntity> _airportsData = new List<AirportEntity>()
        {
            new AirportEntity() { Id = 1, Name = "Minsk airport", CityId = 1 },
            new AirportEntity() { Id = 2, Name = "Brest airport", CityId = 2 },
            new AirportEntity() { Id = 3, Name = "Paris airport", CityId = 3 }
        };
        
        public async Task<IReadOnlyCollection<AirportEntity>> GetAllAsync()
        {
            return _airportsData;
        }

        public async Task<AirportEntity> GetAsync(int id)
        {
            return _airportsData.FirstOrDefault(x => x.Id == id);
        }

        public async Task<IReadOnlyCollection<AirportEntity>> GetByNameAsync(string nameFilter)
        {
            return _airportsData;
        }

        public async Task<int> AddAsync(AirportEntity item)
        {
            return 0;
        }

        public async Task UpdateAsync(AirportEntity item)
        {
            // implementation
        }

        public async  Task<bool> CheckDuplicateAsync(AirportEntity item)
        {
            AirportEntity duplicate =
                _airportsData.FirstOrDefault(x => x.Name == item.Name && x.CityId == item.CityId);

            return duplicate != null;
        }
    }
}