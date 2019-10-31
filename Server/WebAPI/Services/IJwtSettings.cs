using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Services
{
    public interface IJwtSettings
    {
        string Secret { get; }
        string Issuer { get; }
        TimeSpan ExpirationTime { get; }
    }
}