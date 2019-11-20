using System;
using System.Collections;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Accounts;
using AutoMapper;
using DataAccessLayer;
using DataAccessLayer.Models;
using AccountEntity = DataAccessLayer.Models.AccountEntity;

namespace BusinessLayer.Services.Accounts
{
    public class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly IAccountRepository _accountRepository;
        private readonly IUserInfo _userInfo;
        private readonly IAccountUpdatingSettings _accountUpdatingSettings;


        public AccountService(
            IMapper mapper,
            IAccountRepository repository,
            IUserInfo userInfo,
            IAccountUpdatingSettings accountUpdatingSettings
        )
        {
            _mapper = mapper;
            _accountRepository = repository;
            _userInfo = userInfo;
            _accountUpdatingSettings = accountUpdatingSettings;
        }


        public async Task<Account> LoginAsync(Account account)
        {
            AccountEntity dalAccount = await _accountRepository.GetByEmailAsync(account.Email);

            if (dalAccount == null)
            {
                return null;
            }

            byte[] loginPasswordHash = PasswordHasher.GenerateHash(
                account.Password,
                dalAccount.Salt
            );

            if (!dalAccount.PasswordHash.SequenceEqual(loginPasswordHash))
            {
                return null;
            }

            return _mapper.Map<Account>(dalAccount);
        }

        public async Task<Account> ExternalLoginAsync(Account account)
        {
            AccountEntity dalAccount = await _accountRepository.GetByEmailAsync(account.Email);

            if (dalAccount == null)
            {
                return null;
            }

            return _mapper.Map<Account>(dalAccount);
        }

        public async Task<Account> RegisterAsync(Account account)
        {
            AccountEntity dalAccount = _mapper.Map<AccountEntity>(account);

            bool duplicate = await _accountRepository.CheckDuplicateAsync(dalAccount);

            if (duplicate)
            {
                return null;
            }

            if (account.Password != null)
            {
                byte[] saltForNewAccount = PasswordHasher.GenerateSalt();
                dalAccount.Salt = saltForNewAccount;
                dalAccount.PasswordHash = PasswordHasher.GenerateHash(account.Password, saltForNewAccount);
            }

            AccountEntity newAccount = await _accountRepository.CreateAccountAsync(dalAccount);

            return _mapper.Map<Account>(newAccount);
        }

        public async Task<ResultTypes> UpdateNameAsync(string firstName, string secondName)
        {
            AccountUpdatesEntity accountUpdatesDal =
                await _accountRepository.GetAccountUpdatesAsync(_userInfo.AccountId);

            if (accountUpdatesDal != null)
            {
                AccountUpdates accountUpdates = _mapper.Map<AccountUpdates>(accountUpdatesDal);

                DateTimeOffset whenCanUpdateName =
                    accountUpdates.LastNameUpdateTime + _accountUpdatingSettings.NameUpdatingInterval;

                if (whenCanUpdateName > DateTimeOffset.Now)
                {
                    return ResultTypes.InvalidData;
                }
            }

            await _accountRepository.UpdateNameAsync(_userInfo.AccountId, firstName, secondName);

            return ResultTypes.Ok;
        }

        public async Task<AddResult> UpdateAvatarAsync(byte[] avatarByteArray, string fileExtension)
        {
            AccountUpdatesEntity accountUpdatesDal =
                await _accountRepository.GetAccountUpdatesAsync(_userInfo.AccountId);

            if (accountUpdatesDal != null)
            {
                AccountUpdates accountUpdates = _mapper.Map<AccountUpdates>(accountUpdatesDal);

                DateTimeOffset whenCanUpdateAvatar =
                    accountUpdates.LastAvatarUpdateTime + _accountUpdatingSettings.AvatarUpdatingInterval;

                if (whenCanUpdateAvatar > DateTimeOffset.Now)
                {
                    return new AddResult(ResultTypes.InvalidData, null);
                }
            }

            await _accountRepository.UpdateAvatarAsync(_userInfo.AccountId, avatarByteArray, fileExtension);

            // account id as created item id because image has the same name as member id
            return new AddResult(ResultTypes.Ok, _userInfo.AccountId);
        }

        public async Task<string> GetAvatarAsync()
        {
            return await _accountRepository.GetAvatarAsync(_userInfo.AccountId);
        }
    }
}