using System;
using BusinessLayer;
using DataAccessLayer;

namespace BusinessLogicTests
{
    public class BookingSettingsMock : IBookingSettings
    {
        public TimeSpan ExpirationTime { get; }
        public TimeSpan TimeUntilBookingAvailable { get; }

        public BookingSettingsMock(TimeSpan expirationTime)
        {
            ExpirationTime = expirationTime;
        }
    }
}