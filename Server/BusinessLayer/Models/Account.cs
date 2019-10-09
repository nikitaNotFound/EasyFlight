﻿using System;
using System.Collections.Generic;
using System.Text;
using Common;

namespace BusinessLayer.Models
{
    public class Account
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public AccountRoles Role { get; set; }


        public Account(
            int? id,
            string firstName,
            string secondName,
            string email,
            string password,
            AccountRoles role
        )
        {
            Id = id;
            FirstName = firstName;
            SecondName = secondName;
            Email = email;
            Password = password;
            Role = role;
        }
    }
}