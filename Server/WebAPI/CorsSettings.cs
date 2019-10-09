using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;

namespace WebAPI
{
    public class CorsSettings
    {
        private readonly IConfiguration _configuration;


        public CorsSettings(IConfiguration configuration)
        {
            this._configuration = configuration;
        }


        public string AppUrl => _configuration[nameof(AppUrl)];
    }
}