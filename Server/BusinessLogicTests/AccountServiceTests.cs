using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Models;
using BusinessLayer.Services.Accounts;
using BusinessLogicTests.Mocks;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Accounts;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLogicTests
{
    [TestClass]
    public class AccountServiceTests
    {
        private readonly IAccountService _accountService;


        public AccountServiceTests()
        {
            MapperConfiguration mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Account, AccountEntity>();
                config.CreateMap<AccountEntity, Account>();
            });
            mappingConfig.CompileMappings();

            IMapper mapper = mappingConfig.CreateMapper();

            _accountService = new AccountService(mapper, new AccountRepositoryMock());
        }


        [TestMethod]
        public async Task LoginWithBadDataReturnsNull()
        {
            // Arrange
            Account loginAccount = new Account() { Email = "123@123.com", Password = "hghghg" };

            // Act
            Account authorizedAccount = await _accountService.LoginAsync(loginAccount);

            // Assert
            Assert.IsNull(authorizedAccount);
        }

        [TestMethod]
        public async Task LoginWithValidDataReturnsAccount()
        {
            // Arrange
            Account loginAccount = new Account() { Email = "123@123.com", Password = "123" };

            // Act
            Account authorizedAccount = await _accountService.LoginAsync(loginAccount);

            // Assert
            Assert.IsNotNull(authorizedAccount);
        }

        [TestMethod]
        public async Task RegisterWithDuplicateAccountReturnsNull()
        {
            // Arrange
            Account registerAccount = new Account() { Email = "123@123.com", Password = "123" };

            // Act
            Account registeredAccount = await _accountService.RegisterAsync(registerAccount);

            // Assert
            Assert.IsNull(registeredAccount);
        }

        [TestMethod]
        public async Task RegisterAccountReturnsAccount()
        {
            // Arrange
            Account registerAccount = new Account() { Email = "1234@1234.com", Password = "123" };

            // Act
            Account registeredAccount = await _accountService.RegisterAsync(registerAccount);

            // Assert
            Assert.IsNotNull(registeredAccount);
        }
    }
}