using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer;
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

        private readonly List<FlightBookInfoEntity> _flightBooksInfo = new List<FlightBookInfoEntity>()
        {
            new FlightBookInfoEntity()
            {
                Id = 1,
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = DateTimeOffset.Now
            },
            new FlightBookInfoEntity()
            {
                Id = 2,
                AccountId = 1,
                BookType = BookType.Payed,
                FlightId = 2,
                BookTime = DateTimeOffset.Now
            },
        };

        private readonly List<SeatBookEntity> _flightSeatsInfo = new List<SeatBookEntity>()
        {
            new SeatBookEntity()
            {
                SeatId = 1,
                FlightBookInfoId = 1
            },
            new SeatBookEntity()
            {
                SeatId = 1,
                FlightBookInfoId = 2
            }
        };

        private readonly IBookingSettings _bookingSettings;


        public FlightRepositoryMock(IBookingSettings bookingSettings)
        {
            _bookingSettings = bookingSettings;
        }

        public Task<ItemsPageEntity<FlightEntity>> GetAllAsync(int currentPage, int pageLimit)
        {
            throw new NotImplementedException();
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

        public Task<ItemsPageEntity<FlightEntity>> SearchFlightsAsync(FlightFilterEntity filter)
        {
            throw new NotImplementedException();
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

        public async Task BookSeatAsync(SeatBookEntity seatBook)
        {
            // implementation
        }

        public async Task FinalBookAsync(int bookId, int accountId)
        {
            // implementation
        }

        public async Task<bool> CheckSeatBookAvailabilityAsync(int flightId, int seatId)
        {
            SeatBookEntity seat = _flightSeatsInfo.FirstOrDefault(x => x.SeatId == seatId);

            if (seat == null)
            {
                return true;
            }

            FlightBookInfoEntity bookInfo = _flightBooksInfo.FirstOrDefault(
                x => x.FlightId == flightId
                && DateTimeOffset.Now - x.BookTime <= _bookingSettings.ExpirationTime
                && x.Id == seat.FlightBookInfoId
            );

            return bookInfo == null;
        }

        public async Task<bool> CheckFinalBookAvailabilityAsync(int bookId, int accountId)
        {
            FlightBookInfoEntity bookInfo = _flightBooksInfo.FirstOrDefault(
                x => x.Id == bookId
                && x.AccountId == accountId
                && DateTimeOffset.Now - x.BookTime <= _bookingSettings.ExpirationTime
                && x.BookType == BookType.AwaitingPayment
            );

            return bookInfo != null;
        }

        public async Task<IReadOnlyCollection<SeatBookEntity>> GetFlightBookedSeatsAsync(int flightId)
        {
            return _flightSeatsInfo;
        }

        public async Task<IReadOnlyCollection<FlightBookInfoEntity>> GetAccountFlightsInfoAsync(int accountId)
        {
            return _flightBooksInfo.Select(x => x).Where(x => x.AccountId == accountId).ToList();
        }

        public async Task<int> AddAccountFlightInfoAsync(FlightBookInfoEntity bookInfo)
        {
            return 0;
        }

        public async Task<IReadOnlyCollection<SeatBookEntity>> GetBookSeatsAsync(int bookId)
        {
            return _flightSeatsInfo.Select(x => x).Where(x => x.FlightBookInfoId == bookId).ToList();
        }

        public async Task<int?> GetBookStatusAsync(int bookId)
        {
            return 0;
        }
    }
}