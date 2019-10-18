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
                new { email = account.Email },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> GetByEmail(string email)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "getAccountByEmail",
                new { email = email },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> LoginAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "loginAccount",
                new { email = account.Email, password = account.HashedPassword },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> RegisterAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "registerAccount",
                new {
                    firstName = account.FirstName,
                    secondName = account.SecondName,
                    email = account.Email,
                    password = account.HashedPassword,
                    salt = account.Salt,
                    role = AccountRoles.User
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}