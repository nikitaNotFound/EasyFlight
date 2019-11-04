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
        private readonly IMapper _mapper;


        public AirportServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Airport, AirportEntity>();
                config.CreateMap<AirportEntity, Airport>();
            });
            mappingConfig.CompileMappings();

            _mapper = mappingConfig.CreateMapper();
        }


        [TestMethod]
        public async Task AddingDuplicateAirportReturnsDuplicateResult()
        {
            // Arrange
            Airport airport = new Airport() { Name = "Minsk airport", CityId = 1 };

            AirportService airportService = new AirportService(new AirportRepositoryMock(), _mapper);

            // Act
            ServiceResult addResult = await airportService.AddAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }
        
        [TestMethod]
        public async Task AddingAirportReturnsOkResult()
        {
            // Arrange
            Airport airport = new Airport() { Name = "Brest airport", CityId = 4 };

            AirportService airportService = new AirportService(new AirportRepositoryMock(), _mapper);

            // Act
            ServiceResult addResult = await airportService.AddAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }
        
        [TestMethod]
        public async Task UpdatingAirportReturnsOkResult()
        {
            // Arrange
            Airport airport = new Airport() { Id = 1, Name = "Brest airport", CityId = 4 };

            AirportService airportService = new AirportService(new AirportRepositoryMock(), _mapper);

            // Act
            ResultTypes addResult = await airportService.UpdateAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }
        
        [TestMethod]
        public async Task UpdatingDuplicateAirportReturnsDuplicateResult()
        {
            // Arrange
            Airport airport = new Airport() { Id = 2, Name = "Minsk airport", CityId = 1 };

            AirportService airportService = new AirportService(new AirportRepositoryMock(), _mapper);

            // Act
            ResultTypes addResult = await airportService.UpdateAsync(airport);

            //Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }
    }
}