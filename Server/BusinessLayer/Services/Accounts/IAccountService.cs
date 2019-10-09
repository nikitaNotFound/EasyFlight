using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;

namespace BusinessLayer.Services.Users
{
    public interface IAccountService
    {
        Task<ResultTypes> LoginAsync(Account account);
        Task<ResultTypes> RegisterAsync(Account account);
    }
}