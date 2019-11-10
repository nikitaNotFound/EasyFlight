using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Common;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Flights
{
    public interface IFlightRepository
    {
        Task<IReadOnlyCollection<FlightEntity>> GetAllAsync();
        Task<FlightEntity> GetByIdAsync(int id);
        Task<int> AddAsync(FlightEntity flight);
        Task UpdateAsync(FlightEntity newFlight);
        Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter);
        Task<IReadOnlyCollection<FlightSeatTypeCostEntity>> GetFlightSeatTypesCostAsync(int flightId);
        Task AddFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task UpdateFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task<bool> CheckFlightSeatTypeCostDuplicateAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task BookAsync(FlightBookInfoEntity bookInfo);
        Task<bool> CheckBookAvailability(int flightId, int seatId, TimeSpan expirationTime);
        Task<bool> CheckFinalBookAvailability(FlightBookInfoEntity bookInfo, TimeSpan expirationTime);
        Task<IReadOnlyCollection<FlightBookInfoEntity>> GetFlightBookInfo(int flightId, TimeSpan expirationTime);
        Task<IReadOnlyCollection<FlightEntity>> GetAccountFlights(int accountId);
    }
}