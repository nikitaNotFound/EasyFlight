using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
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
                new { Id = id },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<int> AddAsync(FlightEntity flight)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteAsync(
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
                "AddFlight",
                new
                {
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

        public async Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<FlightEntity> flights = await db.QueryAsync<FlightEntity>(
                "SearchFlights",
                filter,
                commandType: CommandType.StoredProcedure);

            return flights.ToList();
        }

        public async Task<IReadOnlyCollection<FlightSeatTypeCostEntity>> GetFlightSeatTypesCostAsync(int flightId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            IEnumerable<FlightSeatTypeCostEntity> flights = await db.QueryAsync<FlightSeatTypeCostEntity>(
                "GetFlightSeatTypesCost",
                new { FlightId = flightId },
                commandType: CommandType.StoredProcedure);

            return flights.ToList();
        }

        public async Task<int> AddFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteAsync(
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
                "CheckFlightSeatTypeDuplicate",
                new
                {
                    FlightId = seatTypeCost.FlightId,
                    SeatTypeId = seatTypeCost.SeatTypeId,
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}