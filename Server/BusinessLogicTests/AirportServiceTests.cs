using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Models;
using BusinessLayer.Services.Airports;
using BusinessLogicTests.Mocks;
using DataAccessLayer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLogicTests
{
    [TestClass]
    public class AirportServiceTests
    {
        private readonly IAirportService _airportService;


        public AirportServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Airport, AirportEntity>();
                config.CreateMap<AirportEntity, Airport>();
            });
            mappingConfig.CompileMappings();

            IMapper mapper = mappingConfig.CreateMapper();

            _airportService = new AirportService(new AirportRepositoryMock(), mapper);
        }


        [TestMethod]
        public async Task AddingDuplicateAirportReturnsDuplicateResult()
        {
            // Arrange
            Airport airport = new Airport() { Name = "Minsk airport", CityId = 1 };

            // Act
            AddResult addResult = await _airportService.AddAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingAirportReturnsOkResult()
        {
            // Arrange
            Airport airport = new Airport() { Name = "Brest airport", CityId = 4 };

            // Act
            AddResult addResult = await _airportService.AddAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingAirportReturnsOkResult()
        {
            // Arrange
            Airport airport = new Airport() { Id = 1, Name = "Brest airport", CityId = 4 };

            // Act
            ResultTypes addResult = await _airportService.UpdateAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }

        [TestMethod]
        public async Task UpdatingDuplicateAirportReturnsDuplicateResult()
        {
            // Arrange
            Airport airport = new Airport() { Id = 2, Name = "Minsk airport", CityId = 1 };

            // Act
            ResultTypes addResult = await _airportService.UpdateAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }
    }
}