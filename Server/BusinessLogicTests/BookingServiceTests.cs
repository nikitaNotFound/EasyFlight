using System;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Models;
using BusinessLayer.Services.Booking;
using BusinessLayer.Services.Flights;
using BusinessLogicTests.Mocks;
using Common;
using DataAccessLayer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLogicTests
{
    [TestClass]
    public class BookingServiceTests
    {
        private readonly IBookingService _bookingService;


        public BookingServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Flight, FlightEntity>();
                config.CreateMap<FlightEntity, Flight>();
                config.CreateMap<FlightSeatTypeCost, FlightSeatTypeCostEntity>();
                config.CreateMap<FlightSeatTypeCostEntity, FlightSeatTypeCost>();
                config.CreateMap<FlightFilter, FlightFilterEntity>();
                config.CreateMap<FlightFilterEntity, FlightFilter>();
                config.CreateMap<FlightBookInfo, FlightBookInfoEntity>();
                config.CreateMap<FlightBookInfoEntity, FlightBookInfo>();
                config.CreateMap<SeatBook, SeatBookEntity>();
                config.CreateMap<SeatBookEntity, SeatBook>();
            });
            mappingConfig.CompileMappings();

            IMapper mapper = mappingConfig.CreateMapper();

            IBookingSettings bookingSettings = new BookingSettingsMock(new TimeSpan(0, 5, 0));

            _bookingService = new BookingService(
                mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock(),
                bookingSettings,
                null
            );
        }


        [TestMethod]
        public async Task BookingForTimeBookedSeatReturnsDuplicateResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        SeatId = 1,
                        FlightBookInfoId = 1
                    }
                }
            };

            // Act
            AddResult bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, bookResult.ResultType);
        }

        [TestMethod]
        public async Task BookingForTimeSeatWithNonexistentFlightReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 2000,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        SeatId = 2
                    }
                }
            };

            // Act
            AddResult bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult.ResultType);
        }

        [TestMethod]
        public async Task BookingForTimeSeatWithNonexistentSeatReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                Id = 1,
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        SeatId = 200
                    }
                }
            };

            // Act
            AddResult bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult.ResultType);
        }

        [TestMethod]
        public async Task BookingForTimeReturnsOkResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                Id = 1,
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        FlightBookInfoId = 1,
                        SeatId = 2
                    }
                }
            };

            // Act
            AddResult bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, bookResult.ResultType);
        }

        [TestMethod]
        public async Task FinalBookingWithoutBookingForTimeReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                Id = 3,
                AccountId = 1,
                FlightId = 1,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        SeatId = 2,
                        FlightBookInfoId = 1
                    }
                }
            };

            // Act
            ResultTypes bookResult = await _bookingService.FinalBookAsync(bookInfo.Id.Value, "transaction");

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult);
        }

        [TestMethod]
        public async Task FinalBookingWithInvalidTransactionReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                Id = 1,
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        SeatId = 1
                    }
                }
            };

            // Act
            ResultTypes bookResult =
                await _bookingService.FinalBookAsync(bookInfo.Id.Value, "wrongtransaction");

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult);
        }

        [TestMethod]
        public async Task FinalBookingReturnsOkResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                Id = 1,
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = DateTimeOffset.Now,
                SeatBooks = new SeatBook[]
                {
                    new SeatBook()
                    {
                        SeatId = 1
                    }
                }
            };

            // Act
            ResultTypes bookResult = await _bookingService.FinalBookAsync(bookInfo.Id.Value, "transaction");

            // Assert
            Assert.AreEqual(ResultTypes.Ok, bookResult);
        }
    }
}