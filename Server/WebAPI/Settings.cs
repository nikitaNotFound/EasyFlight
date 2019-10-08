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
        private IConfiguration Configuration;

        public Settings(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }


        public string ConnectionString => Configuration[nameof(ConnectionString)];
        public string AppUrl => Configuration[nameof(AppUrl)];
    }
}