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
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 1
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, bookResult);
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
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 23
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult);
        }

        [TestMethod]
        public async Task BookingForTimeSeatWithNonexistentSeatReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 23
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult);
        }

        [TestMethod]
        public async Task BookingForTimeReturnsOkResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 2
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookForTimeAsync(bookInfo);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, bookResult);
        }

        [TestMethod]
        public async Task FinalBookingWithoutBookingForTimeReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 1
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookAsync(bookInfo, "transaction");

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult);
        }

        [TestMethod]
        public async Task FinalBookingWithInvalidTransactionReturnsNotFoundResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 2
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookAsync(bookInfo, "wrongtransaction");

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, bookResult);
        }

        [TestMethod]
        public async Task FinalBookingReturnsOkResult()
        {
            // Arrange
            FlightBookInfo bookInfo = new FlightBookInfo()
            {
                AccountId = 1,
                BookType = BookType.AwaitingPayment,
                FlightId = 1,
                BookTime = new DateTimeOffset(
                    new DateTime(2019, 11, 8, 20, 30, 0),
                    new TimeSpan(3, 0, 0)
                ),
                SeatId = 2
            };

            // Act
            ResultTypes bookResult = await _bookingService.BookAsync(bookInfo, "transaction");

            // Assert
            Assert.AreEqual(ResultTypes.Ok, bookResult);
        }
    }
}