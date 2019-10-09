using System.Threading.Tasks;
using BusinessLayer.Models;
using DataAccessLayer.Repositories.Accounts;
using AutoMapper;
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
            AccountEntity dalAccount = _mapper.Map<AccountEntity>(account);

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
            
            bool dublicate = await _accountRepository.CheckDublicateAsync(dalAccount);

            if (dublicate)
            {
                return null;
            }

            AccountEntity newAccount = await _accountRepository.RegisterAsync(dalAccount);

            return _mapper.Map<Account>(newAccount);
        }
    }
}