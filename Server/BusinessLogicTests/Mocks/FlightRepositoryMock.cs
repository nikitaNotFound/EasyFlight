using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Models;
using Common;
using DataAccessLayer;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Flights;

namespace BusinessLogicTests.Mocks
{
    public class FlightRepositoryMock : IFlightRepository
    {
        private readonly List<FlightEntity> _flightData = new List<FlightEntity>()
        {
            new FlightEntity()
            {
                Id = 1,
                FromAirportId = 1,
                ToAirportId = 2,
                DepartureTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 16, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                ArrivalTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 17, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                AirplaneId = 1,
                SuitcaseMassKg = 15,
                SuitcaseCount = 1,
                HandLuggageMassKg = 5,
                HandLuggageCount = 1,
                MassOverloadKgCost = 10
            },
            new FlightEntity()
            {
                Id = 2,
                FromAirportId = 1,
                ToAirportId = 3,
                DepartureTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 16, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                ArrivalTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 20, 0, 0),
                    new TimeSpan(1, 0, 0)
                ),
                AirplaneId = 1,
                SuitcaseMassKg = 15,
                SuitcaseCount = 1,
                HandLuggageMassKg = 5,
                HandLuggageCount = 1,
                MassOverloadKgCost = 10
            }
        };

        private readonly List<FlightSeatTypeCostEntity> _flightSeatTypeCostData = new List<FlightSeatTypeCostEntity>()
        {
            new FlightSeatTypeCostEntity() { FlightId = 2, SeatTypeId = 1, Cost = 400 }
        };

        private readonly List<FlightBookInfoEntity> _flightSeatInfo = new List<FlightBookInfoEntity>()
        {
            new FlightBookInfoEntity()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 1
            },
            new FlightBookInfoEntity()
            {
                AccountId = 1,
                BookType = BookType.Payed,
                FlightId = 2,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 35, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 1
            },
        };

        public async Task<IReadOnlyCollection<FlightEntity>> GetAllAsync()
        {
            return _flightData;
        }

        public async Task<FlightEntity> GetByIdAsync(int id)
        {
            return _flightData.FirstOrDefault(x => x.Id == id);
        }

        public async Task<int> AddAsync(FlightEntity flight)
        {
            return 0;
        }

        public async Task UpdateAsync(FlightEntity newFlight)
        {
            // implementation
        }

        public async Task<IReadOnlyCollection<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter)
        {
            return _flightData;
        }

        public async Task<IReadOnlyCollection<FlightSeatTypeCostEntity>> GetFlightSeatTypesCostAsync(int flightId)
        {
            return _flightSeatTypeCostData.Select(x => x).Where(x => x.FlightId == flightId).ToList();
        }

        public async Task AddFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            // implementation
        }

        public async Task UpdateFlightSeatTypeCostAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            // implementation
        }

        public async Task<bool> CheckFlightSeatTypeCostDuplicateAsync(FlightSeatTypeCostEntity seatTypeCost)
        {
            FlightSeatTypeCostEntity duplicate = _flightSeatTypeCostData.FirstOrDefault(
                x => x.FlightId == seatTypeCost.FlightId && x.SeatTypeId == seatTypeCost.SeatTypeId
            );

            return duplicate != null;
        }

        public async Task BookAsync(FlightBookInfoEntity bookInfo)
        {
            // implementation
        }

        public async Task<bool> CheckBookAvailability(int flightId, int seatId, TimeSpan expirationTime)
        {
            FlightBookInfoEntity seatInfo =  _flightSeatInfo.FirstOrDefault(
                x => x.FlightId == flightId
                && x.SeatId == seatId
                && DateTimeOffset.Now - x.BookTime < expirationTime
                && x.BookType != BookType.Payed
            );

            return seatInfo != null;
        }

        public async Task<bool> CheckFinalBookAvailability(FlightBookInfoEntity bookInfo, TimeSpan expirationTime)
        {
            FlightBookInfoEntity seatInfo =  _flightSeatInfo.FirstOrDefault(
                x => x.FlightId == bookInfo.FlightId
                     && x.SeatId == bookInfo.SeatId
                     && DateTimeOffset.Now - x.BookTime < expirationTime
                     && x.BookType == BookType.AwaitingPayment
                     && x.AccountId == bookInfo.AccountId
            );

            return seatInfo != null;
        }
    }
}