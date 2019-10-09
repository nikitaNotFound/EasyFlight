using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Accounts
{
    public interface IAccountService
    {
        Task<Account> LoginAsync(Account account);
        Task<Account> RegisterAsync(Account account);
    }
}