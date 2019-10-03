using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyFlight
{
    public class Settings
    {
        private IConfiguration configuration;

        public Settings(IConfiguration configuration)
        {
            this.configuration = configuration;
        }


        public string ConnectionString => configuration[nameof(ConnectionString)];
        public string[] FriendlyUrls => configuration[nameof(FriendlyUrls)];
    }
}