using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Accounts
{
    public interface IAccountRepository
    {
        Task<AccountEntity> GetByEmail(string email);
        Task<AccountEntity> LoginAsync(AccountEntity account);
        Task<bool> CheckDublicateAsync(AccountEntity account);
        Task<AccountEntity> RegisterAsync(AccountEntity account);
    }
}