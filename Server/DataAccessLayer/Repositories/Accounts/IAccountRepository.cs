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
        Task<AccountEntity> GetAccountAsync(AccountEntity account);
        Task<bool> CheckDuplicateAsync(AccountEntity account);
        Task<AccountEntity> CreateAccountAsync(AccountEntity account);
        Task UpdateNameAsync(int accountId, string firstName, string secondName);
        Task UpdateAvatarAsync(int accountId, byte[] avatarByteArray);
        Task<bool> CanUpdateNameAsync(int accountId);
        Task<bool> CanUpdateAvatarAsync(int accountId);
        Task<string> GetAvatarAsync(int accountId);
    }
}