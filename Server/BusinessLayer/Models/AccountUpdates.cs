using System;

namespace BusinessLayer.Models
{
    public class AccountUpdates
    {
        public int AccountId { get; set; }
        public DateTimeOffset LastNameUpdateTime { get; set; }
        public DateTimeOffset LastAvatarUpdateTime { get; set; }
    }
}