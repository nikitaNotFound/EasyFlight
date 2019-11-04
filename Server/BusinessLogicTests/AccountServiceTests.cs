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
        private readonly IMapper _mapper;


        public AccountServiceTests()
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
        
        [TestMethod]
        public async Task LoginWithValidDataReturnsAccount()
        {
            // Arrange
            Account loginAccount = new Account() { Email = "123@123.com", Password = "123" };
            AccountService accountService = new AccountService(_mapper, new AccountRepositoryMock());
            
            // Act
            Account authorizedAccount = await accountService.LoginAsync(loginAccount);

            // Assert
            Assert.IsNotNull(authorizedAccount);
        }
        
        [TestMethod]
        public async Task RegisterWithDuplicateAccountReturnsNull()
        {
            // Arrange
            Account registerAccount = new Account() { Email = "123@123.com", Password = "123" };
            AccountService accountService = new AccountService(_mapper, new AccountRepositoryMock());
            
            // Act
            Account registeredAccount = await accountService.RegisterAsync(registerAccount);

            // Assert
            Assert.IsNull(registeredAccount);
        }
        
        [TestMethod]
        public async Task RegisterAccountReturnsAccount()
        {
            // Arrange
            Account registerAccount = new Account() { Email = "1234@1234.com", Password = "123" };
            AccountService accountService = new AccountService(_mapper, new AccountRepositoryMock());
            
            // Act
            Account registeredAccount = await accountService.RegisterAsync(registerAccount);

            // Assert
            Assert.IsNotNull(registeredAccount);
        }
    }
}