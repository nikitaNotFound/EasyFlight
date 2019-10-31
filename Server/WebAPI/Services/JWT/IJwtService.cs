using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Account = WebAPI.Models.Account;

namespace WebAPI.Services.JWT
{
    public interface IJwtService
    {
        string CreateTokenAsync(Account account, string audience);
    }
}
