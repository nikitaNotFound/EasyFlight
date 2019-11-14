using System;
using DataAccessLayer;
using Microsoft.Extensions.Configuration;

namespace WebAPI
{
    public class AccountUpdatingSettings : IAccountUpdatingSettings
    {
        public TimeSpan NameUpdatingInterval => TimeSpan.Parse(_config[nameof(NameUpdatingInterval)]);
        public TimeSpan AvatarUpdatingInterval => TimeSpan.Parse(_config[nameof(AvatarUpdatingInterval)]);

        private readonly IConfiguration _config;


        public AccountUpdatingSettings(IConfiguration configuration)
        {
            _config = configuration.GetSection(nameof(AccountUpdatingSettings));
        }
    }
}