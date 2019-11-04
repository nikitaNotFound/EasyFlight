using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Services.Accounts;
using DataAccessLayer.Models;
using DataAccessLayer.Repositories.Accounts;

namespace BusinessLogicTests.Mocks
{
    public class AccountRepositoryMock : IAccountRepository
    {
        private readonly List<AccountEntity> _accountData = new List<AccountEntity>()
        {
            new AccountEntity()
            {
                Id = 1,
                Email = "123@123.com",
                PasswordHash = PasswordHasher.GenerateHash("123", new byte[0]),
                Salt = new byte[0]
            }
        };
        
        public async Task<AccountEntity> GetByEmailAsync(string email)
        {
            return _accountData.FirstOrDefault(x => x.Email == email);
        }

        public async Task<AccountEntity> GetAccountAsync(AccountEntity account)
        {
            return _accountData.FirstOrDefault(x => x.Email == account.Email && x.PasswordHash == account.PasswordHash);
        }

        public async Task<bool> CheckDuplicateAsync(AccountEntity account)
        {
            AccountEntity duplicate = _accountData.FirstOrDefault(x => x.Email == account.Email);

            return duplicate != null;
        }

        public async Task<AccountEntity> CreateAccountAsync(AccountEntity account)
        {
            return account;
        }
    }
}