using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BusinessLayer;
using BusinessLayer.Services.Accounts;
using DataAccessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services.JWT;
using AccountBl = BusinessLayer.Models.Account;

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
        private readonly IFilesUploadingSettings _filesUploadingSettings;


        public AccountsController(
            IAccountService accountService,
            IMapper mapper,
            IJwtService jwtService,
            IFilesUploadingSettings filesUploadingSettings
        )
        {
            _accountService = accountService;
            _mapper = mapper;
            _jwtService = jwtService;
            _filesUploadingSettings = filesUploadingSettings;
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

        // PUT api/accounts/my/name{?firstName}{?secondName}
        [HttpPut]
        [AllowAnonymous]
        [Route("my/name")]
        public async Task<IActionResult> UpdateNameAsync(string firstName, string secondName)
        {
            if (string.IsNullOrEmpty(firstName) || string.IsNullOrEmpty(secondName))
            {
                return BadRequest();
            }

            ResultTypes updateResult = await _accountService.UpdateNameAsync(firstName, secondName);

            if (updateResult == ResultTypes.InvalidData)
            {
                return BadRequest();
            }

            return Ok();
        }

        // PUT api/accounts/my/avatar{?firstName}{?secondName}
        [HttpPut]
        [AllowAnonymous]
        [Route("my/avatar")]
        public async Task<IActionResult> UpdateAvatarAsync(IFormFile file)
        {
            string fileExtension = Path.GetExtension(file.FileName);

            if (!_filesUploadingSettings.AllowedExtensions.Contains(fileExtension))
            {
                return BadRequest();
            }

            Stream fileStream = file.OpenReadStream();
            MemoryStream fileMemoryStream = new MemoryStream();

            fileStream.CopyTo(fileMemoryStream);

            byte[] fileByteArray = fileMemoryStream.ToArray();

            ResultTypes updateResult = await _accountService.UpdateAvatarAsync(fileByteArray);

            if (updateResult == ResultTypes.InvalidData)
            {
                return BadRequest();
            }

            return Ok(new { Image = Convert.ToBase64String(fileByteArray) });
        }

        // PUT api/accounts/my/avatar{?firstName}{?secondName}
        [HttpGet]
        [AllowAnonymous]
        [Route("my/avatar")]
        public async Task<IActionResult> GetAvatarAsync()
        {
            string base64Image = await _accountService.GetAvatarAsync();

            return Ok(new { Image = base64Image });
        }
    }
}