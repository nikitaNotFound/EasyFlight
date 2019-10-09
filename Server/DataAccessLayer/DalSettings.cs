using System;
using Microsoft.Extensions.Configuration;

namespace DataAccessLayer
{
    public class DalSettings : IDalSettings
    {
        private readonly IConfiguration _configuration;


        public DalSettings(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public string ConnectionString => _configuration[nameof(ConnectionString)];
    }
}
