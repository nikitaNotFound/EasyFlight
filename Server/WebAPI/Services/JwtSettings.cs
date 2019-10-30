using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Services
{
    public class JwtSettings : IJwtSettings
    {
        private readonly IConfiguration _configuration;

        public string Secret => _configuration[nameof(Secret)];
        public TimeSpan ExpirationTime => TimeSpan.Parse(_configuration[nameof(ExpirationTime)]);


        public JwtSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(JwtSettings));
        }
    }
}