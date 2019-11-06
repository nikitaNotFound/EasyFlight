using System;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Models;
using BusinessLayer.Services.Accounts;
using BusinessLayer.Services.Flights;
using BusinessLogicTests.Mocks;
using DataAccessLayer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLogicTests
{
    [TestClass]
    public class FlightServiceTests
    {
        private readonly IMapper _mapper;


        public FlightServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Flight, FlightEntity>();
                config.CreateMap<FlightEntity, Flight>();
                config.CreateMap<FlightSeatTypeCost, FlightSeatTypeCostEntity>();
                config.CreateMap<FlightSeatTypeCostEntity, FlightSeatTypeCost>();
                config.CreateMap<FlightFilter, FlightFilterEntity>();
                config.CreateMap<FlightFilterEntity, FlightFilter>();
            });
            mappingConfig.CompileMappings();

            _mapper = mappingConfig.CreateMapper();
        }


        [TestMethod]
        public async Task AddingFlightSeatTypeCostReturnsOkResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 1,
                FlightId = 1,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            AddResult addResult = await flightService.AddFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingFlightSeatTypeCostToNonexistentFlightReturnsNotFoundResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 1,
                FlightId = 200,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            AddResult addResult = await flightService.AddFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingFlightSeatTypeCostToNonexistentSeatTypeReturnsNotFoundResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 200,
                FlightId = 1,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            AddResult addResult = await flightService.AddFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingDuplicateFlightSeatTypeCostReturnsDuplicateResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 1,
                FlightId = 2,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            AddResult addResult = await flightService.AddFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingFlightSeatTypeCostReturnsOkResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 1,
                FlightId = 1,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            ResultTypes addResult = await flightService.UpdateFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }

        [TestMethod]
        public async Task UpdatingFlightSeatTypeCostToNonexistentFlightReturnsNotFoundResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 1,
                FlightId = 200,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            ResultTypes addResult = await flightService.UpdateFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult);
        }

        [TestMethod]
        public async Task UpdatingFlightSeatTypeCostToNonexistentSeatTypeReturnsNotFoundResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 200,
                FlightId = 1,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            ResultTypes addResult = await flightService.UpdateFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult);
        }

        [TestMethod]
        public async Task UpdatingDuplicateFlightSeatTypeCostReturnsDuplicateResult()
        {
            // Arrange
            FlightSeatTypeCost seatTypeCost = new FlightSeatTypeCost()
            {
                SeatTypeId = 1,
                FlightId = 2,
                Cost = 300
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            ResultTypes addResult = await flightService.UpdateFlightSeatTypeCostAsync(seatTypeCost);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }

        [TestMethod]
        public async Task AddingFlightWithNonexistentAirplaneReturnsNotFoundResult()
        {
            // Arrange
            Flight flight = new Flight()
            {
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
                AirplaneId = 200,
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            AddResult addResult = await flightService.AddAsync(flight);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingFlightWithNonexistentAirportReturnsNotFoundResult()
        {
            // Arrange
            Flight flight = new Flight()
            {
                FromAirportId = 200,
                ToAirportId = 200,
                DepartureTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 16, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                ArrivalTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 17, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                AirplaneId = 1,
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            AddResult addResult = await flightService.AddAsync(flight);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingFlightWithNonexistentAirplaneReturnsNotFoundResult()
        {
            // Arrange
            Flight flight = new Flight()
            {
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
                AirplaneId = 200,
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            ResultTypes addResult = await flightService.UpdateAsync(flight);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult);
        }

        [TestMethod]
        public async Task UpdatingFlightWithNonexistentAirportReturnsNotFoundResult()
        {
            // Arrange
            Flight flight = new Flight()
            {
                FromAirportId = 200,
                ToAirportId = 200,
                DepartureTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 16, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                ArrivalTime = new DateTimeOffset(
                    new DateTime(2019, 5, 20, 17, 0, 0),
                    new TimeSpan(3, 0, 0)
                ),
                AirplaneId = 1,
            };
            FlightService flightService = new FlightService(
                _mapper,
                new FlightRepositoryMock(),
                new AirportRepositoryMock(),
                new AirplanesRepositoryMock()
            );

            // Act
            ResultTypes addResult = await flightService.UpdateAsync(flight);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult);
        }
    }
}