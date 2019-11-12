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


        public FlightRepository(IDalSettings dalSettings)
        {
            _dalSettings = dalSettings;
        }


        public async Task<IReadOnlyCollection<FlightEntity>> GetAllAsync()
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<FlightEntity> flights = await db.QueryAsync<FlightEntity>(
                "GetAllFlights",
                null,
                commandType: CommandType.StoredProcedure);

            return flights.ToList();
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

        public async Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(
            FlightFilterEntity filter,
            TimeSpan expirationTime
        )
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<FlightEntity> flights = await db.QueryAsync<FlightEntity>(
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
                    BookExpirationTimeInSeconds = expirationTime.TotalSeconds
                },
                commandType: CommandType.StoredProcedure);

            return flights.ToList();
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

        public async Task<bool> CheckSeatBookAvailabilityAsync(int flightId, int seatId, TimeSpan expirationTime)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return !await db.ExecuteScalarAsync<bool>(
                "CheckSeatBookAvailability",
                new
                {
                    FlightId = flightId,
                    SeatId = seatId,
                    BookExpirationTimeInSeconds = expirationTime.TotalSeconds,
                    FinalBookType = BookType.Payed
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CheckFinalBookAvailabilityAsync(int flightId, int accountId, TimeSpan expirationTime)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckFinalBookAvailability",
                new
                {
                    FlightId = flightId,
                    BookExpirationTimeInSeconds = expirationTime.TotalSeconds,
                    AccountId = accountId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsAsync(
            int flightId,
            TimeSpan expirationTime
        )
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<SeatBookEntity> seats = await db.QueryAsync<SeatBookEntity>(
                "GetFlightBookedSeats",
                new
                {
                    FlightId = flightId,
                    BookExpirationTimeInSeconds = expirationTime.TotalSeconds,
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

        public async Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsByBookIdAsync(int bookId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<SeatBookEntity> seats = await db.QueryAsync<SeatBookEntity>(
                "GetFlightBookedSeatsByBookId",
                new
                {
                    BookId = bookId
                },
                commandType: CommandType.StoredProcedure);

            return seats.ToList();
        }

        public async Task FinalBookAsync(int flightId, int accountId, int bookId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.QuerySingleOrDefaultAsync<int>(
                "FinalBook",
                new
                {
                    FlightId = flightId,
                    AccountId = accountId,
                    BookId = bookId,
                    FinalBookType = BookType.Payed
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}