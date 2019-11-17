using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Flights
{
    public interface IFlightService
    {
        Task<ItemsPage<Flight>> GetAllAsync(int currentPage, int pageLimit);
        Task<Flight> GetByIdAsync(int id);
        Task<AddResult> AddAsync(Flight flight);
        Task<ResultTypes> UpdateAsync(Flight newFlight);
        Task<ItemsPage<Flight>> SearchFlightsAsync(FlightFilter filter);
        Task<IReadOnlyCollection<FlightSeatTypeCost>> GetFlightSeatTypesCost(int flightId);
        Task<ResultTypes> AddFlightSeatTypeCostAsync(FlightSeatTypeCost seatTypeCost);
        Task<ResultTypes> UpdateFlightSeatTypeCostAsync(FlightSeatTypeCost newSeatTypeCost);
    }
}