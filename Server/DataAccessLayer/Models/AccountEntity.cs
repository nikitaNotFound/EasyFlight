using System;
using System.Collections.Generic;
using System.Text;
using Common;

namespace DataAccessLayer.Models
{
    public class AccountEntity
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] Salt { get; set; }
        public AccountRole Role { get; set; }
    }
}