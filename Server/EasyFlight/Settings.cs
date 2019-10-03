using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;

namespace EasyFlight
{
    public class Settings : IDalSettings
    {
        private IConfiguration configuration;

        public Settings(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public string ConnectionString => configuration[nameof(ConnectionString)];
    }
}