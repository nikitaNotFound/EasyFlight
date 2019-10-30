using System;
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
        public AccountRole Role { get; set; }
    }
}