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

        public async Task UpdateNameAsync(int accountId, string firstName, string secondName)
        {
            // implementation
        }

        public async Task UpdateAvatarAsync(int accountId, byte[] avatarByteArray)
        {
            // implementation
        }

        public async Task<bool> CanUpdateNameAsync(int accountId)
        {
            if (accountId == 1)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> CanUpdateAvatarAsync(int accountId)
        {
            if (accountId == 1)
            {
                return false;
            }

            return true;
        }

        public Task<string> GetAvatarAsync(int accountId)
        {
            throw new NotImplementedException();
        }
    }
}