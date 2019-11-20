using System;

namespace Common
{
    public interface IBookingSettings
    {
        TimeSpan ExpirationTime { get; }
        TimeSpan TimeUntilBookingAvailable { get; }
    }
}