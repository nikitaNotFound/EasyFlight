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
        private readonly IAccountUpdatingSettings _accountUpdatingSettings;


        public AccountRepository(IDalSettings dalSettings, IAccountUpdatingSettings accountUpdatingSettings)
        {
            _dalSettings = dalSettings;
            _accountUpdatingSettings = accountUpdatingSettings;
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
                "GetAccount",
                new { email = account.Email, passwordHash = account.PasswordHash },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<AccountEntity> CreateAccountAsync(AccountEntity account)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return await db.QuerySingleOrDefaultAsync<AccountEntity>(
                "CreateAccount",
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

        public async Task UpdateNameAsync(int accountId, string firstName, string secondName)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            await db.ExecuteAsync(
                "UpdateAccountName",
                new
                {
                    FirstName = firstName,
                    SecondName = secondName,
                    AccountId = accountId
                },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> CanUpdateName(int accountId)
        {
            using SqlConnection db = new SqlConnection(_dalSettings.ConnectionString);

            return !await db.ExecuteScalarAsync<bool>(
                "CanUpdateAccountName",
                new {
                    AccountId = accountId,
                    AccountNameUpdatingIntervalInSeconds = _accountUpdatingSettings.NameUpdatingInterval.TotalSeconds
                },
                commandType: CommandType.StoredProcedure);
        }
    }
}