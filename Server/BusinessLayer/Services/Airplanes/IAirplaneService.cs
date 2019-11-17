using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Airplanes
{
    public interface IAirplaneService
    {
        Task<ItemsPage<Airplane>> GetAllAsync(int currentPage, int pageLimit);
        Task<Airplane> GetByIdAsync(int id);
        Task<IReadOnlyCollection<AirplaneSeat>> GetAirplaneSeatsAsync(int airplaneId);
        Task<IReadOnlyCollection<AirplaneSeatType>> GetAirplaneSeatTypesAsync (int airplaneId);
        Task<ItemsPage<Airplane>> SearchAirplanesAsync(AirplaneFilter filter);
        Task<AddResult> AddAsync(Airplane airplane);
        Task<ResultTypes> UpdateAsync(Airplane airplane);
        Task<ResultTypes> UpdateAirplaneSeatsAsync(int airplaneId, AirplaneSeat[] seatScheme);
        Task<AddResult> AddAirplaneSeatTypeAsync(AirplaneSeatType seatType);
        Task<ResultTypes> DeleteAirplaneSeatTypeAsync(int airplaneId, int seatTypeId);
        Task<AirplaneSeat> GetSeatByIdAsync(int seatId);
        Task<AirplaneSeatType> GetSeatTypeByIdAsync(int seatTypeId);
    }
}