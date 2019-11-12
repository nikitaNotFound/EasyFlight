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
        Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter, TimeSpan expirationTime);
        Task<IReadOnlyCollection<FlightSeatTypeCostEntity>> GetFlightSeatTypesCostAsync(int flightId);
        Task AddFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task UpdateFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task<bool> CheckFlightSeatTypeCostDuplicateAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task BookSeatAsync(SeatBookEntity seatBook);
        Task FinalBookAsync(int flightId, int accountId, int bookId);
        Task<bool> CheckSeatBookAvailabilityAsync(int flightId, int seatId, TimeSpan expirationTime);
        Task<bool> CheckFinalBookAvailabilityAsync(int flightId, int accountId, TimeSpan expirationTime);
        Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsAsync(int flightId, TimeSpan expirationTime);
        Task<IReadOnlyCollection<FlightBookInfoEntity>> GetAccountFlightsInfoAsync(int accountId);
        Task<int> AddAccountFlightInfoAsync(FlightBookInfoEntity bookInfo);
        Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsByBookIdAsync(int bookId);
    }
}