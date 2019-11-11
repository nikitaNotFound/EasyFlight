using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Airplanes;

namespace BusinessLogicTests.Mocks
{
    public class AirplanesRepositoryMock : IAirplaneRepository
    {
        private readonly List<AirplaneEntity> _airplaneData = new List<AirplaneEntity>()
        {
            new AirplaneEntity() {Id = 1, Name = "F300"},
            new AirplaneEntity() {Id = 2, Name = "Big boss"}
        };

        private readonly List<AirplaneSeatTypeEntity> _airplaneSeatTypeData = new List<AirplaneSeatTypeEntity>()
        {
            new AirplaneSeatTypeEntity() {Id = 1, Name = "Business class", AirplaneId = 1, Color = "red"},
            new AirplaneSeatTypeEntity() {Id = 2, Name = "Econom class", AirplaneId = 2, Color = "green"}
        };

        private readonly List<AirplaneSeatEntity> _airplaneSeatData = new List<AirplaneSeatEntity>()
        {
            new AirplaneSeatEntity() { Id = 1 },
            new AirplaneSeatEntity() { Id = 2 },
            new AirplaneSeatEntity() { Id = 3 }
        };

    public async Task<IReadOnlyCollection<AirplaneEntity>> GetAllAsync()
        {
            return _airplaneData;
        }

        public async Task<AirplaneEntity> GetByIdAsync(int id)
        {
            return _airplaneData.FirstOrDefault(x => x.Id == id);
        }

        public async Task<IReadOnlyCollection<AirplaneSeatEntity>> GetAirplaneSeatsAsync(int airplaneId)
        {
            return _airplaneSeatData.Select(x => x).Where(x => x.AirplaneId == airplaneId).ToList();
        }

        public async Task<AirplaneSeatTypeEntity> GetSeatTypeById(int seatTypeId)
        {
            return _airplaneSeatTypeData.FirstOrDefault(x => x.Id == seatTypeId);
        }

        public async Task DeleteAirplaneSeatsAsync(int airplaneId)
        {
            // implementation
        }

        public async Task<IReadOnlyCollection<AirplaneSeatTypeEntity>> GetAirplaneSeatTypesAsync(int airplaneId)
        {
            return _airplaneSeatTypeData.Select(x => x).Where(x => x.AirplaneId == airplaneId).ToList();
        }

        public async Task<IReadOnlyCollection<AirplaneEntity>> SearchAirplanesAsync(AirplaneFilterEntity filter)
        {
            return _airplaneData;
        }

        public async Task<int> AddAsync(AirplaneEntity airplane)
        {
            return 0;
        }

        public async Task UpdateAsync(AirplaneEntity airplane)
        {
            // implementation
        }

        public async Task UpdateAirplaneSeatsAsync(int airplaneId, AirplaneSeatEntity[] seats)
        {
            // implementation
        }

        public async Task<int> AddAirplaneSeatTypeAsync(AirplaneSeatTypeEntity seatType)
        {
            return 0;
        }

        public async Task DeleteAirplaneSeatTypeAsync(int airplaneId, int seatTypeId)
        {
            // implementation
        }

        public async Task<bool> CheckAirplaneDuplicateAsync(AirplaneEntity airplane)
        {
            AirplaneEntity duplicate = _airplaneData.FirstOrDefault(x => x.Name == airplane.Name);

            return duplicate != null;
        }

        public async Task<bool> CheckSeatTypeDuplicateAsync(AirplaneSeatTypeEntity seatType)
        {
            AirplaneSeatTypeEntity duplicate = _airplaneSeatTypeData.FirstOrDefault(
                x => x.Name == seatType.Name && x.AirplaneId == seatType.AirplaneId
            );

            return duplicate != null;
        }

        public async Task<AirplaneSeatEntity> GetSeatById(int id)
        {
            return _airplaneSeatData.FirstOrDefault(x => x.Id == id);
        }
    }
}