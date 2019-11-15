using System;

namespace DataAccessLayer
{
    public interface IBookingSettings
    {
        TimeSpan ExpirationTime { get; }
        TimeSpan TimeUntilBookingAvailable { get; }
    }
}