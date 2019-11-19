using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Accounts
{
    public interface IAccountRepository
    {
        Task<AccountEntity> GetByEmailAsync(string email);
        Task<bool> CheckDuplicateAsync(AccountEntity account);
        Task<AccountEntity> CreateAccountAsync(AccountEntity account);
        Task UpdateNameAsync(int accountId, string firstName, string secondName);
        Task UpdateAvatarAsync(int accountId, byte[] avatarByteArray, string fileExtension);
        Task<AccountUpdatesEntity> GetAccountUpdatesAsync(int accountId);
        Task<string> GetAvatarAsync(int accountId);
    }
}