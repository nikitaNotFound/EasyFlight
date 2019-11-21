using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Common;
using DataAccessLayer.Models;
using Microsoft.VisualBasic.CompilerServices;

namespace DataAccessLayer.Repositories.Flights
{
    public interface IFlightRepository
    {
        Task<ItemsPageEntity<FlightEntity>> GetAllAsync(int currentPage, int pageLimit);
        Task<FlightEntity> GetByIdAsync(int id);
        Task<int> AddAsync(FlightEntity flight);
        Task UpdateAsync(FlightEntity newFlight);
        Task<ItemsPageEntity<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter);
        Task<IReadOnlyCollection<FlightSeatTypeCostEntity>> GetFlightSeatTypesCostAsync(int flightId);
        Task AddFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task UpdateFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task<bool> CheckFlightSeatTypeCostDuplicateAsync(FlightSeatTypeCostEntity seatTypeCost);
        Task BookSeatAsync(SeatBookEntity seatBook);
        Task FinalBookAsync(int bookId, int accountId);
        Task<bool> CheckSeatBookAvailabilityAsync(int flightId, int seatId);
        Task<bool> CheckFinalBookAvailabilityAsync(int bookId, int accountId);
        Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsAsync(int flightId);
        Task<IReadOnlyCollection<FlightBookInfoEntity>> GetAccountFlightsInfoAsync(int accountId);
        Task<int> AddAccountFlightInfoAsync(FlightBookInfoEntity bookInfo);
        Task<IReadOnlyCollection<SeatBookEntity>> GetBookSeatsAsync(int bookId);
        Task<int?> GetBookStatusAsync(int bookId);
    }
}