using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Flights
{
    public interface IFlightService
    {
        Task<IReadOnlyCollection<Flight>> GetAllAsync();
        Task<Flight> GetByIdAsync(int id);
        Task<AddResult> AddAsync(Flight flight);
        Task<ResultTypes> UpdateAsync(Flight newFlight);
        Task<IReadOnlyCollection<Flight>> SearchFlightsAsync(FlightFilter filter);
        Task<IReadOnlyCollection<FlightSeatTypeCost>> GetFlightSeatTypesCost(int flightId);
        Task<ResultTypes> AddFlightSeatTypeCostAsync(FlightSeatTypeCost seatTypeCost);
        Task<ResultTypes> UpdateFlightSeatTypeCostAsync(FlightSeatTypeCost newSeatTypeCost);
        Task<ResultTypes> BookFlightSeatForTimeAsync(int userId, int flightId, int seatId);
        Task<ResultTypes> BookFlightSeatAsync(int userId, int flightId, int seatId, string transaction);
        Task<IReadOnlyCollection<FlightSeatInfo>> GetBookedSeatsAsync(int flightId);
    }
}