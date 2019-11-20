using System;

namespace DataAccessLayer.Models
{
    public class AccountUpdatesEntity
    {
        public int AccountId { get; set; }
        public DateTimeOffset LastNameUpdateTime { get; set; }
        public DateTimeOffset LastAvatarUpdateTime { get; set; }
    }
}