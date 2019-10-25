using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer.Services.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessLayer.Services.Accounts;
using AutoMapper;
using WebAPI.Models;
using WebAPI.Services.JWT;
using AccountBl = BusinessLayer.Models.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;


        public AccountsController(IAccountService accountService, IMapper mapper, IJwtService jwtService)
        {
            _accountService = accountService;
            _mapper = mapper;
            _jwtService = jwtService;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] AccountRequest accountRequest)
        {
            AccountBl accountBl = _mapper.Map<AccountBl>(accountRequest);

            AccountBl authAccountBl = await _accountService.LoginAsync(accountBl);

            if (authAccountBl == null)
            {
                return BadRequest();
            }

            Account authAccount = _mapper.Map<Account>(authAccountBl);
            
            string token = _jwtService.CreateTokenAsync(authAccount);

            AccountResponse accountResponse = new AccountResponse(
                authAccount.Id,
                authAccount.FirstName,
                authAccount.SecondName,
                authAccount.Email,
                authAccount.Password,
                (int)authAccount.Role,
                token
            );

            return Ok(accountResponse);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] AccountRequest accountRequest)
        {
            AccountBl accountBl = _mapper.Map<AccountBl>(accountRequest);

            AccountBl registerAccountBl = await _accountService.RegisterAsync(accountBl);

            if (registerAccountBl == null)
            {
                return BadRequest();
            }

            Account registerAccount = _mapper.Map<Account>(registerAccountBl);
            
            string token = _jwtService.CreateTokenAsync(registerAccount);

            AccountResponse accountResponse = new AccountResponse(
                registerAccount.Id,
                registerAccount.FirstName,
                registerAccount.SecondName,
                registerAccount.Email,
                registerAccount.Password,
                (int)registerAccount.Role,
                token
            );

            return Ok(accountResponse);
        }
    }
}