using Microsoft.Extensions.DependencyInjection;
using WebAPI.Services.JWT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI
{
    public static class WebAPIModule
    {
        public static void Register(IServiceCollection services)
        {
            services.AddTransient<IJwtService, JwtService>();
        }
    }
}