using System;
using BusinessLayer;

namespace BusinessLogicTests
{
    public class BookingSettingsMock : IBookingSettings
    {
        public TimeSpan ExpirationTime { get; }

        public BookingSettingsMock(TimeSpan expirationTime)
        {
            ExpirationTime = expirationTime;
        }
    }
}