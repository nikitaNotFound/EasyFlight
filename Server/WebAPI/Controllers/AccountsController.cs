﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessLayer.Services.Accounts;
using AutoMapper;
using WebAPI.Models;
using WebAPI.Services.JWT;
using AccountBl = BusinessLayer.Models.Account;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [ApiController]
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
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] ReciveAccount account)
        {
            AccountBl accountBl = _mapper.Map<AccountBl>(account);

            AccountBl authAccountBl = await _accountService.LoginAsync(accountBl);

            if (authAccountBl == null)
            {
                string message = "Invalid email or password!";
                return Conflict(message);
            }

            Account authAccount = _mapper.Map<Account>(authAccountBl);

            string token =_jwtService.CreateTokenAsync(authAccount);

            ResponseAccount responseAccount = new ResponseAccount(
                authAccount.Id,
                authAccount.FirstName,
                authAccount.SecondName,
                authAccount.Email,
                authAccount.Password,
                authAccount.Role,
                token
            );

            return Ok(responseAccount);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] ReciveAccount account)
        {
            AccountBl accountBl = _mapper.Map<AccountBl>(account);

            AccountBl registerAccountBl = await _accountService.RegisterAsync(accountBl);

            if (registerAccountBl == null)
            {
                string message = "Account with such email already exists!";
                return Conflict(message);
            }

            Account registerAccount = _mapper.Map<Account>(registerAccountBl);

            string token =  _jwtService.CreateTokenAsync(registerAccount);

            ResponseAccount responseAccount = new ResponseAccount(
                registerAccount.Id,
                registerAccount.FirstName,
                registerAccount.SecondName,
                registerAccount.Email,
                registerAccount.Password,
                registerAccount.Role,
                token
            );

            return Ok(responseAccount);
        }
    }
}