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

        public int AccountId
        {
            get
            {
                string nameIdentifier = _claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                if (nameIdentifier == null)
                {
                    return 0;
                }

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