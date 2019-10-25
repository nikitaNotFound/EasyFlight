using System;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Accounts;
using AutoMapper;
using Microsoft.Extensions.Logging;
using AccountEntity = DataAccessLayer.Models.AccountEntity;

namespace BusinessLayer.Services.Accounts
{
    class AccountService : IAccountService
    {
        private readonly IMapper _mapper;
        private readonly IAccountRepository _accountRepository;


        public AccountService(IMapper mapper, IAccountRepository repository)
        {
            _mapper = mapper;
            _accountRepository = repository;
        }


        public async Task<Account> LoginAsync(Account account)
        {
            AccountEntity dalAccount = await _accountRepository.GetByEmailAsync(account.Email);

            if (dalAccount == null)
            {
                return null;
            }

            dalAccount.HashedPassword = HashService.GenerateHash(
                account.Password,
                dalAccount.Salt
            );

            AccountEntity authAccount = await _accountRepository.LoginAsync(dalAccount);

            if (authAccount == null)
            {
                return null;
            }

            return _mapper.Map<Account>(authAccount);
        }

        public async Task<Account> RegisterAsync(Account account)
        {
            AccountEntity dalAccount = _mapper.Map<AccountEntity>(account);

            byte[] saltForNewAccount = HashService.GenerateSalt();
            dalAccount.Salt = saltForNewAccount;
            dalAccount.HashedPassword = HashService.GenerateHash(account.Password, saltForNewAccount);

            bool duplicate = await _accountRepository.CheckDuplicateAsync(dalAccount);

            if (duplicate)
            {
                return null;
            }

            AccountEntity newAccount = await _accountRepository.RegisterAsync(dalAccount);

            return _mapper.Map<Account>(newAccount);
        }
    }
}