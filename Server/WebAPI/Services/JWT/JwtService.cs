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

namespace WebAPI.Services.JWT
{
    public class JwtService : IJwtService
    {
        private readonly IJwtSettings _jwtSettings;


        public JwtService(IJwtSettings settings)
        {
            _jwtSettings = settings;
        }


        public string CreateTokenAsync(Account account)
        {
            Claim[] claims = new Claim[]
            {
                new Claim(ClaimTypes.Email, account.Email),
                new Claim(ClaimTypes.NameIdentifier, nameof(account.Role)),
                new Claim(ClaimTypes.Role, account.Role.ToString())
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(_jwtSettings.ExpireDays),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
