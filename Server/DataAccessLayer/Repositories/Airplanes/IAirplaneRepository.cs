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
        Task<Array[]> GetAirplaneSeatSchemeAsync(int airplaneId);
        Task<IReadOnlyCollection<AirplaneSeatTypeEntity>> GetAirplaneSeatTypesAsync(int airplaneId);
        Task<IReadOnlyCollection<AirplaneEntity>> SearchAirplanes(AirplaneFilterEntity filter);
        Task AddAsync(AirplaneEntity airplane);
        Task AddAirplaneSeatSchemeAsync(Array[] seatScheme);
        Task AddAirplaneSeatTypeAsync(AirplaneSeatTypeEntity seatType);
    }
}
