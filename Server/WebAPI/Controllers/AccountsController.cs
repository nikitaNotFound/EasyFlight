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
using Google.Apis.Auth;

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


        // POST api/accounts/login/google{?authToken}
        [HttpPost]
        [AllowAnonymous]
        [Route("login/google")]
        public async Task<IActionResult> LoginUsingGoogleAsync(string tokenId)
        {
            if (string.IsNullOrEmpty(tokenId))
            {
                return BadRequest();
            }

            GoogleJsonWebSignature.Payload payload;
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(
                    tokenId
                );
            }
            catch
            {
                return BadRequest();
            }

            AccountRequest authAccount = new AccountRequest() { Email = payload.Email };

            AccountBl authAccountBl = _mapper.Map<AccountBl>(authAccount);

            AccountBl accountBl = await _accountService.ExternalLoginAsync(authAccountBl);

            if (accountBl == null)
            {
                return BadRequest();
            }

            Account account = _mapper.Map<Account>(accountBl);

            string token = _jwtService.CreateTokenAsync(account);

            AccountResponse accountResponse = new AccountResponse(
                account.Id,
                account.FirstName,
                account.SecondName,
                account.Email,
                account.Password,
                (int)account.Role,
                token
            );

            return Ok(accountResponse);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register/google")]
        public async Task<IActionResult> RegisterWithGoogleAsync(string tokenId)
        {
            if (string.IsNullOrEmpty(tokenId))
            {
                return BadRequest();
            }

            GoogleJsonWebSignature.Payload payload;
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(
                    tokenId
                );
            }
            catch
            {
                return BadRequest();
            }

            AccountBl accountBl = new AccountBl()
            {
                FirstName = payload.GivenName,
                SecondName = payload.FamilyName,
                Email = payload.Email
            };

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

        // PUT api/accounts/my/avatar
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

            using Stream fileStream = file.OpenReadStream();
            using MemoryStream fileMemoryStream = new MemoryStream();

            fileStream.CopyTo(fileMemoryStream);

            byte[] fileByteArray = fileMemoryStream.ToArray();

            AddResult updateResult = await _accountService.UpdateAvatarAsync(fileByteArray, fileExtension);

            if (updateResult.ResultType == ResultTypes.InvalidData)
            {
                return BadRequest();
            }

            string imagePath = Path.Combine(
                _filesUploadingSettings.StaticFilesHost,
                _filesUploadingSettings.StaticFilesCatalogName,
                updateResult.ItemId + fileExtension
            );

            return Ok(new { Image = imagePath });
        }

        // GET api/accounts/my/avatar
        [HttpGet]
        [AllowAnonymous]
        [Route("my/avatar")]
        public async Task<IActionResult> GetAvatarAsync()
        {
            string imageName = await _accountService.GetAvatarAsync();

            string imagePath = Path.Combine(
                _filesUploadingSettings.StaticFilesHost,
                _filesUploadingSettings.StaticFilesCatalogName,
                imageName
            );

            return Ok(new { Image = imagePath });
        }
    }
}