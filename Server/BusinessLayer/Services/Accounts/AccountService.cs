using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Accounts;
using AutoMapper;
using AccountEntity = DataAccessLayer.Models.AccountEntity;

namespace BusinessLayer.Services.Accounts
{
    public class AccountService : IAccountService
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

        public async Task<Account> RegisterAsync(Account account)
        {
            AccountEntity dalAccount = _mapper.Map<AccountEntity>(account);

            bool duplicate = await _accountRepository.CheckDuplicateAsync(dalAccount);
            
            if (duplicate)
            {
                return null;
            }
            
            byte[] saltForNewAccount = PasswordHasher.GenerateSalt();
            dalAccount.Salt = saltForNewAccount;
            dalAccount.PasswordHash = PasswordHasher.GenerateHash(account.Password, saltForNewAccount);

            AccountEntity newAccount = await _accountRepository.CreateAccountAsync(dalAccount);

            return _mapper.Map<Account>(newAccount);
        }
    }
}