using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Airplanes
{
    public interface IAirplaneService
    {
        Task<IReadOnlyCollection<Airplane>> GetAllAsync();
        Task<Airplane> GetByIdAsync(int id);
        Task<Array[]> GetAirplaneSeatSchemeAsync(int airplaneId);
        Task<IReadOnlyCollection<AirplaneSeatType>> GetAirplaneSeatTypesAsync (int airplaneId);
        Task<IReadOnlyCollection<Airplane>> SearchAirplanes(AirplaneFilter filter);
        Task<ResultTypes> AddAsync(Airplane airplane);
        Task<ResultTypes> AddAirplaneSeatSchemeAsync(Array[] seatScheme);
        Task<ResultTypes> AddAirplaneSeatTypeAsync(AirplaneSeatType seatType);
    }
}
