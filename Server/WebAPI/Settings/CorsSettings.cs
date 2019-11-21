using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;
using Newtonsoft.Json;

namespace WebAPI.Settings
{
    public class CorsSettings
    {
        private readonly IConfiguration _configuration;


        public CorsSettings(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public string[] AllowedOrigins => _configuration.GetSection("AllowedOrigins").Get<string[]>();
    }
}