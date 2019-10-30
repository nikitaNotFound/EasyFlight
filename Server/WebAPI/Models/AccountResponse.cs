using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common;

namespace WebAPI.Models
{
    public class AccountResponse
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
        public string Token { get; set; }


        public AccountResponse(
            int? id,
            string firstName,
            string secondName,
            string email,
            string password,
            int role,
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
