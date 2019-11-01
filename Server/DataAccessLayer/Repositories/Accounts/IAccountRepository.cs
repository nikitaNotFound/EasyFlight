﻿using System;
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
    }
}