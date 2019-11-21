using System;
using Common;
using DataAccessLayer;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Settings
{
    public class AccountUpdatingSettings : IAccountUpdatingSettings
    {
        private readonly IConfiguration _configuration;

        public TimeSpan NameUpdatingInterval => TimeSpan.Parse(_configuration[nameof(NameUpdatingInterval)]);
        public TimeSpan AvatarUpdatingInterval => TimeSpan.Parse(_configuration[nameof(AvatarUpdatingInterval)]);


        public AccountUpdatingSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(AccountUpdatingSettings));
        }
    }
}