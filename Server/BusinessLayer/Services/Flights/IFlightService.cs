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
        Task<ResultTypes> BookForTimeAsync(FlightBookInfo bookInfo);
        Task<ResultTypes> BookAsync(FlightBookInfo bookInfo, string transaction);
        Task<IReadOnlyCollection<FlightBookInfo>> GetFlightBookInfoAsync(int flightId);
        Task<IReadOnlyCollection<Flight>> GetAccountFlights(int accountId);
    }
}