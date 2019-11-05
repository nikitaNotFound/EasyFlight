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
        private readonly IMapper _mapper;


        public CountryServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Country, CountryEntity>();
                config.CreateMap<CountryEntity, Country>();
            });
            mappingConfig.CompileMappings();

            _mapper = mappingConfig.CreateMapper();
        }


        [TestMethod] public async Task AddingDuplicateCountryReturnsDuplicateResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Name = "Belarus" };

            CountryService countryService = new CountryService(new CountryRepositoryMock(), _mapper);
            
            // Act
            ServiceAddResult addResult = await countryService.AddAsync(countryToAdd);
            
            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, addResult.ResultType);
        }
        
        [TestMethod]
        public async Task AddingCountryReturnsOkResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Name = "Lithuania" };

            CountryService countryService = new CountryService(new CountryRepositoryMock(), _mapper);
            
            // Act
            ServiceAddResult addResult = await countryService.AddAsync(countryToAdd);
            
            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult.ResultType);
        }
        
        [TestMethod]
        public async Task UpdatingDuplicateCountryReturnsDuplicateResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Id = 1, Name = "Lithuania" };

            CountryService countryService = new CountryService(new CountryRepositoryMock(), _mapper);
            
            // Act
            ResultTypes addResult = await countryService.UpdateAsync(countryToAdd);
            
            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }
        
        [TestMethod]
        public async Task UpdatingCountryReturnsOkResult()
        {
            // Arrange
            Country countryToAdd = new Country() { Id = 1, Name = "Tokyo" };

            CountryService countryService = new CountryService(new CountryRepositoryMock(), _mapper);
            
            // Act
            ResultTypes addResult = await countryService.UpdateAsync(countryToAdd);
            
            // Assert
            Assert.AreEqual(ResultTypes.Ok, addResult);
        }
    }
}