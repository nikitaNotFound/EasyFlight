using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using BusinessLayer.Services.Accounts;
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
                config.CreateMap<Account, AccountEntity>();
                config.CreateMap<AccountEntity, Account>();
            });
            mappingConfig.CompileMappings();

            _mapper = mappingConfig.CreateMapper();
        }


        [TestMethod]
        public async Task LoginWithBadDataReturnsNull()
        {
            // Arrange
            Account loginAccount = new Account() { Email = "123@123.com", Password = "hghghg" };
            AccountService accountService = new AccountService(_mapper, new AccountRepositoryMock());

            // Act
            Account authorizedAccount = await accountService.LoginAsync(loginAccount);

            // Assert
            Assert.IsNull(authorizedAccount);
        }
    }
}