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
        private readonly IMapper _mapper;


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

            _mapper = mappingConfig.CreateMapper();
        }


        [TestMethod]
        public async Task AddingDuplicateAirplaneReturnsDuplicateResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Name = "F300" };
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            AddResult addResult = await airplaneService.AddAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingAirplaneReturnsOkResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Name = "F600" };
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            AddResult addResult = await airplaneService.AddAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingDuplicateAirplaneReturnsDuplicateResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Id = 1, Name = "F300" };
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes addResult = await airplaneService.UpdateAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }

        [TestMethod]
        public async Task UpdatingAirplaneReturnsOkResult()
        {
            // Arrange
            Airplane airplane = new Airplane() { Id = 1, Name = "F600" };
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes addResult = await airplaneService.UpdateAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }

        [TestMethod]
        public async Task AddingDuplicateAirplaneSeatTypeReturnsDuplicateResult()
        {
            // Arrange
            AirplaneSeatType airplane = new AirplaneSeatType() { Name = "Business class", AirplaneId = 1 };
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            AddResult addResult = await airplaneService.AddAirplaneSeatTypeAsync(airplane);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingAirplaneSeatTypeReturnsOkResult()
        {
            // Arrange
            AirplaneSeatType airplane = new AirplaneSeatType() { Name = "King class", AirplaneId = 2 };
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            AddResult addResult = await airplaneService.AddAirplaneSeatTypeAsync(airplane);

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
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes addResult = await airplaneService.UpdateAirplaneSeatsAsync(1, seats);

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
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes addResult = await airplaneService.UpdateAirplaneSeatsAsync(1, seats);

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
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes addResult = await airplaneService.UpdateAirplaneSeatsAsync(1, seats);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, addResult);
        }

        [TestMethod]
        public async Task DeletingNonexistentAirplaneSeatTypeReturnsNotFoundResult()
        {
            // Arrange
            int airplaneId = 200;
            int seatTypeId = 200;
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes deleteResult = await airplaneService.DeleteAirplaneSeatTypeAsync(airplaneId, seatTypeId);

            // Assert
            Assert.AreEqual(ResultTypes.NotFound, deleteResult);
        }

        [TestMethod]
        public async Task DeletingAirplaneSeatTypeReturnsOkResult()
        {
            // Arrange
            int airplaneId = 1;
            int seatTypeId = 1;
            AirplaneService airplaneService = new AirplaneService(_mapper, new AirplanesRepositoryMock());

            // Act
            ResultTypes deleteResult = await airplaneService.DeleteAirplaneSeatTypeAsync(airplaneId, seatTypeId);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, deleteResult);
        }
    }
}