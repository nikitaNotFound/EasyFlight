using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;

namespace WebAPI.Models
{
    public class ResponseAccount
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public AccountRoles Role { get; set; }
        public string Token { get; set; }


        public ResponseAccount(
            int? id,
            string firstName,
            string secondName,
            string email,
            string password,
            AccountRoles role,
            string token
        )
        {
            Id = id;
            FirstName = firstName;
            SecondName = secondName;
            Email = email;
            Password = password;
            Role = role;
            Token = token;
        }
    }
}
