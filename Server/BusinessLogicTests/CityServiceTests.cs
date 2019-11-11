using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Models;
using BusinessLayer.Services.Cities;
using BusinessLogicTests.Mocks;
using DataAccessLayer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLogicTests
{
    [TestClass]
    public class CityServiceTests
    {
        private readonly ICityService _cityService;


        public CityServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<City, CityEntity>();
                config.CreateMap<CityEntity, City>();
            });
            mappingConfig.CompileMappings();

            IMapper mapper = mappingConfig.CreateMapper();

            _cityService = new CityService(new CityRepositoryMock(), mapper);
        }


        [TestMethod]
        public async Task AddingDuplicateCityReturnsDuplicateResult()
        {
            // Arrange
            City cityToAdd = new City() { Name = "Minsk", CountryId = 1 };

            // Act
            AddResult addResult = await _cityService.AddAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingCityReturnsOkResult()
        {
            // Arrange
            City cityToAdd = new City() { Name = "Brest", CountryId = 1 };

            // Act
            AddResult addResult = await _cityService.AddAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingCityToDuplicateReturnsDuplicateResult()
        {
            // Arrange
            City cityToAdd = new City() { Id = 1, Name = "Minsk", CountryId = 1 };

            // Act
            ResultTypes addResult = await _cityService.UpdateAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }

        [TestMethod]
        public async Task UpdatingCityReturnsOkResult()
        {
            // Arrange
            City cityToAdd = new City() { Id = 1, Name = "Brest", CountryId = 1 };

            // Act
            ResultTypes addResult = await _cityService.UpdateAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }
    }
}