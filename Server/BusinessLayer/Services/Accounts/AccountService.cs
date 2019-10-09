using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Accounts;
using AutoMapper;
using AccountEntity = DataAccessLayer.Models.AccountEntity;

namespace BusinessLayer.Services.Users
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

        public async Task<ResultTypes> LoginAsync(Account account)
        {
            AccountEntity dalAccount = _mapper.Map<AccountEntity>(account);

            bool login = await _accountRepository.LoginAsync(dalAccount);

            if (!login)
            {
                return ResultTypes.InvalidData;
            }

            return ResultTypes.OK;
        }

        public async Task<ResultTypes> RegisterAsync(Account account)
        {
            AccountEntity dalAccount = _mapper.Map<AccountEntity>(account);
            
            bool dublicate = await _accountRepository.CheckDublicateAsync(dalAccount);

            if (dublicate)
            {
                return ResultTypes.Dublicate;
            }

            AccountEntity newAccount = await _accountRepository.RegisterAsync(dalAccount);

            await _accountRepository.LoginAsync(newAccount);

            return ResultTypes.OK;
        }
    }
}