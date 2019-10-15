using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using Common;

namespace DataAccessLayer.Repositories.Accounts
{
    class AccountRepository : IAccountRepository
    {
        private readonly IDalSettings _dalSettings;


        public AccountRepository(IDalSettings dalSettings)
        {
            _dalSettings = dalSettings;
        }


        public async Task<bool> CheckDublicateAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAccountDublicate",
                new { email = account.Email},
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> LoginAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "LoginAccount",
                new { email = account.Email, password = account.Password },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> RegisterAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "RegisterAccount",
                new {
                    firstName = account.FirstName,
                    secondName = account.SecondName,
                    email = account.Email,
                    password = account.Password,
                    role = AccountRoles.User
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}