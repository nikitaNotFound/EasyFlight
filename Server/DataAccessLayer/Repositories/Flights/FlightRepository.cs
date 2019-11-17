using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Common;
using Dapper;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Flights
{
    public class FlightRepository : IFlightRepository
    {
        private readonly IDalSettings _dalSettings;
        private readonly IBookingSettings _bookingSettings;


        public FlightRepository(IDalSettings dalSettings, IBookingSettings bookingSettings)
        {
            _dalSettings = dalSettings;
            _bookingSettings = bookingSettings;
        }


        public async Task<ItemsPageEntity<FlightEntity>> GetAllAsync(int currentPage, int pageLimit)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            SqlMapper.GridReader queryResult = await db.QueryMultipleAsync(
                "GetAllFlights",
                new
                {
                    CurrentPage = currentPage,
                    PageLimit = pageLimit
                },
                commandType: CommandType.StoredProcedure);

            ItemsPageEntity<FlightEntity> flights = new ItemsPageEntity<FlightEntity>(
                queryResult.Read<FlightEntity>().ToList(),
                queryResult.Read<int>().First()
            );

            return flights;
        }

        public async Task<FlightEntity> GetByIdAsync(int id)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<FlightEntity>(
                "GetFlightById",
                new {Id = id},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<int> AddAsync(FlightEntity flight)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<int>(
                "AddFlight",
                new
                {
                    FromAirportId = flight.FromAirportId,
                    ToAirportId = flight.ToAirportId,
                    DepartureTime = flight.DepartureTime,
                    ArrivalTime = flight.ArrivalTime,
                    AirplaneId = flight.AirplaneId,
                    SuitcaseMassKg = flight.SuitcaseMassKg,
                    SuitcaseCount = flight.SuitcaseCount,
                    HandLuggageMassKg = flight.HandLuggageMassKg,
                    HandLuggageCount = flight.HandLuggageCount,
                    MassOverloadKgCost = flight.MassOverloadKgCost
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateAsync(FlightEntity newFlight)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateFlight",
                new
                {
                    FlightId = newFlight.Id,
                    FromAirportId = newFlight.FromAirportId,
                    ToAirportId = newFlight.ToAirportId,
                    DepartureTime = newFlight.DepartureTime,
                    ArrivalTime = newFlight.ArrivalTime,
                    AirplaneId = newFlight.AirplaneId,
                    SuitcaseMassKg = newFlight.SuitcaseMassKg,
                    SuitcaseCount = newFlight.SuitcaseCount,
                    HandLuggageMassKg = newFlight.HandLuggageMassKg,
                    HandLuggageCount = newFlight.HandLuggageCount,
                    MassOverloadKgCost = newFlight.MassOverloadKgCost
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<ItemsPageEntity<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            SqlMapper.GridReader queryResult = await db.QueryMultipleAsync(
                "SearchFlights",
                new
                {
                    FromAirportId = filter.FromAirportId,
                    ToAirportId = filter.ToAirportId,
                    FromCityId = filter.FromCityId,
                    ToCityId = filter.ToCityId,
                    DepartureDate = filter.DepartureDate?.Date,
                    ArrivalDate = filter.ArrivalDate?.Date,
                    TicketCount = filter.TicketCount,
                    FinalBookType = BookType.Payed,
                    BookExpirationTimeInSeconds = _bookingSettings.ExpirationTime.TotalSeconds,
                    TimeUntilBookingAvailableInSeconds = _bookingSettings.TimeUntilBookingAvailable.TotalSeconds,
                    CurrentPage = filter.CurrentPage,
                    PageLimit = filter.PageLimit
                },
                commandType: CommandType.StoredProcedure);

            ItemsPageEntity<FlightEntity> flights = new ItemsPageEntity<FlightEntity>(
                queryResult.Read<FlightEntity>().ToList(),
                queryResult.Read<int>().First()
            );

            return flights;
        }

        public async Task<IReadOnlyCollection<FlightSeatTypeCostEntity>> GetFlightSeatTypesCostAsync(int flightId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<FlightSeatTypeCostEntity> flights = await db.QueryAsync<FlightSeatTypeCostEntity>(
                "GetFlightSeatTypesCost",
                new {FlightId = flightId},
                commandType: CommandType.StoredProcedure);

            return flights.ToList();
        }

        public async Task AddFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.QuerySingleOrDefaultAsync(
                "AddFlightSeatTypeCost",
                new
                {
                    FlightId = seatTypeCost.FlightId,
                    SeatTypeId = seatTypeCost.SeatTypeId,
                    Cost = seatTypeCost.Cost
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task UpdateFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateFlightSeatTypeCost",
                new
                {
                    FlightId = seatTypeCost.FlightId,
                    SeatTypeId = seatTypeCost.SeatTypeId,
                    Cost = seatTypeCost.Cost
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckFlightSeatTypeCostDuplicateAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckFlightSeatTypeCostDuplicate",
                new
                {
                    FlightId = seatTypeCost.FlightId,
                    SeatTypeId = seatTypeCost.SeatTypeId,
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task BookSeatAsync(SeatBookEntity bookInfo)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "BookSeat",
                new
                {
                    SeatId = bookInfo.SeatId,
                    Cost = bookInfo.Cost,
                    FlightBookInfoId = bookInfo.FlightBookInfoId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckSeatBookAvailabilityAsync(int flightId, int seatId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return !await db.ExecuteScalarAsync<bool>(
                "CheckSeatBookAvailability",
                new
                {
                    FlightId = flightId,
                    SeatId = seatId,
                    BookExpirationTimeInSeconds = _bookingSettings.ExpirationTime.TotalSeconds,
                    TimeUntilBookingAvailableInSeconds = _bookingSettings.TimeUntilBookingAvailable.TotalSeconds,
                    FinalBookType = BookType.Payed
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckFinalBookAvailabilityAsync(int bookId, int accountId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckFinalBookAvailability",
                new
                {
                    BookId = bookId,
                    BookExpirationTimeInSeconds = _bookingSettings.ExpirationTime.TotalSeconds,
                    AccountId = accountId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsAsync(int flightId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<SeatBookEntity> seats = await db.QueryAsync<SeatBookEntity>(
                "GetFlightBookedSeats",
                new
                {
                    FlightId = flightId,
                    BookExpirationTimeInSeconds = _bookingSettings.ExpirationTime.TotalSeconds,
                    FinalBookType = BookType.Payed
                },
                commandType: CommandType.StoredProcedure);

            return seats.ToList();
        }

        public async Task<IReadOnlyCollection<FlightBookInfoEntity>> GetAccountFlightsInfoAsync(int accountId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<FlightBookInfoEntity> flights = await db.QueryAsync<FlightBookInfoEntity>(
                "GetAccountFlightsInfo",
                new
                {
                    AccountId = accountId,
                    FinalBookType = BookType.Payed
                },
                commandType: CommandType.StoredProcedure);

            return flights.ToList();
        }

        public async Task<int> AddAccountFlightInfoAsync(FlightBookInfoEntity bookInfo)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<int>(
                "AddAccountFlightInfo",
                new
                {
                    FlightId = bookInfo.FlightId,
                    SuitcaseOverloadCost = bookInfo.SuitcaseOverloadCost,
                    HandLuggageOverloadCost = bookInfo.HandLuggageOverloadCost,
                    BookType = BookType.AwaitingPayment,
                    BookTime = DateTimeOffset.Now,
                    AccountId = bookInfo.AccountId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<SeatBookEntity>> GetBookSeatsAsync(int bookId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<SeatBookEntity> seats = await db.QueryAsync<SeatBookEntity>(
                "GetBookSeats",
                new
                {
                    BookId = bookId
                },
                commandType: CommandType.StoredProcedure);

            return seats.ToList();
        }

        public async Task<int?> GetBookStatusAsync(int bookId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<int>(
                "GetBookStatus",
                new
                {
                    BookId = bookId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task FinalBookAsync(int bookId, int accountId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.QuerySingleOrDefaultAsync<int>(
                "FinalBook",
                new
                {
                    BookId = bookId,
                    AccountId = accountId,
                    FinalBookType = BookType.Payed
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}