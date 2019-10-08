using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;

namespace WebAPI
{
    public class Settings : IDalSettings
    {
        private IConfiguration _configuration;

        public Settings(IConfiguration configuration)
        {
            this._configuration = configuration;
        }


        public string ConnectionString => _configuration[nameof(ConnectionString)];
        public string AppUrl => _configuration[nameof(AppUrl)];
    }
}