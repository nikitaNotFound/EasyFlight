using System;
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
                PasswordHash = PasswordHasher.GenerateHash("123", Array.Empty<byte>()),
                Salt = new byte[0]
            }
        };

        private readonly List<AccountUpdatesEntity> _accountUpdates = new List<AccountUpdatesEntity>()
        {
            new AccountUpdatesEntity()
            {
                AccountId = 1,
                LastAvatarUpdateTime = DateTimeOffset.Now,
                LastNameUpdateTime = DateTimeOffset.Now
            }
        };

        public async Task<AccountEntity> GetByEmailAsync(string email)
        {
            return _accountData.FirstOrDefault(x => x.Email == email);
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

        public async Task UpdateNameAsync(int accountId, string firstName, string secondName)
        {
            // implementation
        }

        public async Task UpdateAvatarAsync(int accountId, byte[] avatarByteArray, string fileExtension)
        {
            // implementation
        }

        public async Task<AccountUpdatesEntity> GetAccountUpdatesAsync(int accountId)
        {
            return _accountUpdates.FirstOrDefault(x => x.AccountId == accountId);
        }

        public async Task<string> GetAvatarAsync(int accountId)
        {
            return "";
        }
    }
}