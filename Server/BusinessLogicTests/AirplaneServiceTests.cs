using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Models;
using BusinessLayer.Services.Airplanes;
using BusinessLogicTests.Mocks;
using DataAccessLayer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLogicTests
{
    [TestClass]
    public class AirplaneServiceTests
    {
        private readonly IAirplaneService _airplaneService;


        public AirplaneServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Airplane, AirplaneEntity>();
                config.CreateMap<AirplaneEntity, Airplane>();
                config.CreateMap<AirplaneSeat, AirplaneSeatEntity>();
                config.CreateMap<AirplaneSeatEntity, AirplaneSeatType>();
                config.CreateMap<AirplaneSeatType, AirplaneSeatTypeEntity>();
                config.CreateMap<AirplaneSeatTypeEntity, AirplaneSeatType>();
            });
            mappingConfig.CompileMappings();

            IMapper mapper = mappingConfig.CreateMapper();

            _airplaneService = new AirplaneService(mapper, new AirplanesRepositoryMock());
        }


        [TestMethod]
        public async Task AddingDuplicateAirplaneReturnsDuplicateResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Name = "F300" };

            // Act
            AddResult addResult = await _airplaneService.AddAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingAirplaneReturnsOkResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Name = "F600" };

            // Act
            AddResult addResult = await _airplaneService.AddAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingDuplicateAirplaneReturnsDuplicateResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Id = 1, Name = "F300" };

            // Act
            ResultTypes addResult = await _airplaneService.UpdateAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }

        [TestMethod]
        public async Task UpdatingAirplaneReturnsOkResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Id = 1, Name = "F600" };

            // Act
            ResultTypes addResult = await _airplaneService.UpdateAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }

        [TestMethod]
        public async Task AddingDuplicateAirplaneSeatTypeReturnsDuplicateResult()
        {
            // Arrange
            AirplaneSeatType airplane = new AirplaneSeatType() { Name = "Business class", AirplaneId = 1 };

            // Act
            AddResult addResult = await _airplaneService.AddAirplaneSeatTypeAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingAirplaneSeatTypeReturnsOkResult()
        {
            // Arrange
            AirplaneSeatType airplane = new AirplaneSeatType() { Name = "King class", AirplaneId = 2 };

            // Act
            AddResult addResult = await _airplaneService.AddAirplaneSeatTypeAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingDuplicateAirplaneSeatsReturnsDuplicateResult()
        {
            // Arrange
            AirplaneSeat[] seats = new AirplaneSeat[]
            {
                new AirplaneSeat() { Floor = 1, Section = 1, Zone = 1, Row = 1, Number = 1},
                new AirplaneSeat() { Floor = 1, Section = 1, Zone = 1, Row = 1, Number = 1}
            };

            // Act
            ResultTypes addResult = await _airplaneService.UpdateAirplaneSeatsAsync(1, seats);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }

        [TestMethod]
        public async Task UpdatingAirplaneSeatsReturnsOkResult()
        {
            // Arrange
            AirplaneSeat[] seats = new AirplaneSeat[]
            {
                new AirplaneSeat() { Floor = 1, Section = 1, Zone = 1, Row = 1, Number = 1},
                new AirplaneSeat() { Floor = 1, Section = 1, Zone = 1, Row = 1, Number = 2}
            };

            // Act
            ResultTypes addResult = await _airplaneService.UpdateAirplaneSeatsAsync(1, seats);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }

        [TestMethod]
        public async Task UpdatingAirplaneSeatsWithNonexistentSeatTypeReturnsOkResult()
        {
            // Arrange
            AirplaneSeat[] seats = new AirplaneSeat[]
            {
                new AirplaneSeat() { Floor = 1, Section = 1, Zone = 1, Row = 1, Number = 1, TypeId = 200},
                new AirplaneSeat() { Floor = 1, Section = 1, Zone = 1, Row = 1, Number = 2, TypeId = 200}
            };

            // Act
            ResultTypes addResult = await _airplaneService.UpdateAirplaneSeatsAsync(1, seats);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult);
        }

        [TestMethod]
        public async Task DeletingNonexistentAirplaneSeatTypeReturnsNotFoundResult()
        {
            // Arrange
            int airplaneId = 200;
            int seatTypeId = 200;

            // Act
            ResultTypes deleteResult = await _airplaneService.DeleteAirplaneSeatTypeAsync(airplaneId, seatTypeId);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, deleteResult);
        }

        [TestMethod]
        public async Task DeletingAirplaneSeatTypeReturnsOkResult()
        {
            // Arrange
            int airplaneId = 1;
            int seatTypeId = 1;

            // Act
            ResultTypes deleteResult = await _airplaneService.DeleteAirplaneSeatTypeAsync(airplaneId, seatTypeId);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, deleteResult);
        }
    }
}