using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repositories.Accounts
{
    public interface IAccountRepository
    {
        Task<bool> LoginAsync(AccountEntity account);
        Task<bool> CheckDublicateAsync(AccountEntity account);
        Task<AccountEntity> RegisterAsync(AccountEntity account);
    }
}