﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Services
{
    public class JwtSettings : IJwtSettings
    {
        private readonly IConfiguration _configuration;

        public string SecurityKey => _configuration.GetSection("JwtSettings")["Key"];
        public int ExpireDays => Convert.ToInt32(_configuration.GetSection("JwtSettings")["ExpireDays"]);


        public JwtSettings(IConfiguration configuration)
        {
            _configuration = configuration;
        }
    }
}