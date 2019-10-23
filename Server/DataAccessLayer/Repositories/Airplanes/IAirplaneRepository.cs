using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Airplanes
{
    public interface IAirplaneRepository
    {
        Task<IReadOnlyCollection<AirplaneEntity>> GetAllAsync();
        Task<AirplaneEntity> GetByIdAsync(int id);
        Task<IReadOnlyCollection<AirplaneSeatEntity>> GetAirplaneSeatsAsync(int airplaneId);
        Task DeleteAirplaneSeatsAsync(int airplaneId);
        Task<IReadOnlyCollection<AirplaneSeatTypeEntity>> GetAirplaneSeatTypesAsync(int airplaneId);
        Task<IReadOnlyCollection<AirplaneEntity>> SearchAirplanesAsync(AirplaneFilterEntity filter);
        Task AddAsync(AirplaneEntity airplane);
        Task UpdateAsync(AirplaneEntity airplane);
        Task AddAirplaneSeatsAsync(int airplaneId, AirplaneSeatEntity[] seats);
        Task AddAirplaneSeatTypeAsync(AirplaneSeatTypeEntity seatType);
        Task DeleteAirplaneSeatTypeAsync(int airplaneId, int seatTypeId);
        Task<bool> CheckAirplaneDuplicate(AirplaneEntity airplane);
    }
}
