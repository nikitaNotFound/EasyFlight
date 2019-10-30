using System.Threading.Tasks;
using DataAccessLayer.Models;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using Common;

namespace DataAccessLayer.Repositories.Accounts
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IDalSettings _dalSettings;


        public AccountRepository(IDalSettings dalSettings)
        {
            _dalSettings = dalSettings;
        }


        public async Task<bool> CheckDuplicateAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.ExecuteScalarAsync<bool>(
                "CheckAccountDuplicate",
                new { email = account.Email },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> GetByEmailAsync(string email)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "GetAccountByEmail",
                new { email = email },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> GetAccountAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "LoginAccount",
                new { email = account.Email, passwordHash = account.PasswordHash },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> CreateAccountAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "RegisterAccount",
                new {
                    firstName = account.FirstName,
                    secondName = account.SecondName,
                    email = account.Email,
                    passwordHash = account.PasswordHash,
                    salt = account.Salt,
                    role = AccountRole.User
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}