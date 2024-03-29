using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using BusinessLayer;
using Common;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Settings
{
    public class UserInfo : IUserInfo
    {
        private readonly IEnumerable<Claim> _claims;

        public int AccountId
        {
            get
            {
                string nameIdentifier = _claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

                return int.Parse(nameIdentifier);
            }
        }


        public UserInfo(IHttpContextAccessor httpContextAccessor)
        {
            ClaimsIdentity claimsIdentity = httpContextAccessor?.HttpContext.User.Identity as ClaimsIdentity;
            _claims = claimsIdentity?.Claims;
        }
    }
}