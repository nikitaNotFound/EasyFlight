using System;
using Common;
using DataAccessLayer;

namespace BusinessLogicTests
{
    public class AccountUpdatingSettingsMock : IAccountUpdatingSettings
    {
        public TimeSpan NameUpdatingInterval => new TimeSpan(0, 5, 0);
        public TimeSpan AvatarUpdatingInterval => new TimeSpan(0, 10, 0);
    }
}