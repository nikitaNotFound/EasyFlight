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
        private readonly IMapper _mapper;


        public CityServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<City, CityEntity>();
                config.CreateMap<CityEntity, City>();
            });
            mappingConfig.CompileMappings();

            _mapper = mappingConfig.CreateMapper();
        }


        [TestMethod]
        public async Task AddingDuplicateCityReturnsDuplicateResult()
        {
            // Arrange
            City cityToAdd = new City() { Name = "Minsk", CountryId = 1 };

            CityService cityService = new CityService(new CityRepositoryMock(), _mapper);

            // Act
            AddResult addResult = await cityService.AddAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingCityReturnsOkResult()
        {
            // Arrange
            City cityToAdd = new City() { Name = "Brest", CountryId = 1 };

            CityService cityService = new CityService(new CityRepositoryMock(), _mapper);

            // Act
            AddResult addResult = await cityService.AddAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingDuplicateCityReturnsDuplicateResult()
        {
            // Arrange
            City cityToAdd = new City() { Id = 1, Name = "Minsk", CountryId = 1 };

            CityService cityService = new CityService(new CityRepositoryMock(), _mapper);

            // Act
            ResultTypes addResult = await cityService.UpdateAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult);
        }

        [TestMethod]
        public async Task UpdatingCityReturnsOkResult()
        {
            // Arrange
            City cityToAdd = new City() { Id = 1, Name = "Brest", CountryId = 1 };

            CityService cityService = new CityService(new CityRepositoryMock(), _mapper);

            // Act
            ResultTypes addResult = await cityService.UpdateAsync(cityToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }
    }
}