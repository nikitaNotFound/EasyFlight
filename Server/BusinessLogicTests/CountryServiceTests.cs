using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BusinessLayer.Services.Countries;
using BusinessLayer.Models;
using BusinessLogicTests.Mocks;
using DataAccessLayer.Models;

namespace BusinessLogicTests
{
    [TestClass]
    public class CountryServiceTests
    {
        private readonly ICountryService _countryService;


        public CountryServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Country, CountryEntity>();
                config.CreateMap<CountryEntity, Country>();
            });
            mappingConfig.CompileMappings();

            IMapper mapper = mappingConfig.CreateMapper();

            _countryService = new CountryService(new CountryRepositoryMock(), mapper);
        }


        [TestMethod] public async Task AddingDuplicateCountryReturnsDuplicateResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Name = "Belarus" };

            // Act
            AddResult addResult = await _countryService.AddAsync(countryToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }

        [TestMethod]
        public async Task AddingCountryReturnsOkResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Name = "Lithuania" };

            // Act
            AddResult addResult = await _countryService.AddAsync(countryToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }

        [TestMethod]
        public async Task UpdatingCountryToDuplicateNameReturnsDuplicateResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Id = 1, Name = "Lithuania" };

            // Act
            ResultTypes addResult = await _countryService.UpdateAsync(countryToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }

        [TestMethod]
        public async Task UpdatingCountryReturnsOkResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Id = 1, Name = "Tokyo" };

            // Act
            ResultTypes addResult = await _countryService.UpdateAsync(countryToAdd);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }
    }
}