using System;

namespace BusinessLayer
{
    public interface IBookingSettings
    {
        TimeSpan ExpirationTime { get; }
    }
}