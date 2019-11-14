using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using BusinessLayer;
using Microsoft.AspNetCore.Http;

namespace WebAPI
{
    public class UserInfo : IUserInfo
    {
        private readonly IEnumerable<Claim> _claims;

        public int AccountId => int.Parse(_claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);


        public UserInfo(IHttpContextAccessor httpContextAccessor)
        {
            ClaimsIdentity claimsIdentity = httpContextAccessor?.HttpContext.User.Identity as ClaimsIdentity;
            _claims = claimsIdentity?.Claims;
        }
    }
}