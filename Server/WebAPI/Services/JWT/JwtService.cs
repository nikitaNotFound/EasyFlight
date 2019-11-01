using System;
using System.Collections.Generic;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using WebAPI.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Common;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Services.JWT
{
    public class JwtService : IJwtService
    {
        private readonly IJwtSettings _jwtSettings;
        private readonly IHttpContextAccessor _httpContext;


        public JwtService(IJwtSettings settings, IHttpContextAccessor httpContextAccessor)
        {
            _jwtSettings = settings;
            _httpContext = httpContextAccessor;
        }


        public string CreateTokenAsync(Account account)
        {
            Claim[] claims = new Claim[]
            {
                new Claim(ClaimTypes.Email, account.Email),
                new Claim(ClaimTypes.Role, account.Role.ToString())
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));

            DateTime expires = DateTime.Now.Add(_jwtSettings.ExpirationTime);

            string audience = _httpContext.HttpContext.Request.Headers["Origin"];

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                Issuer = _jwtSettings.Issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
