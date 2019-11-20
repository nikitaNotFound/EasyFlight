using System;

namespace WebAPI.Settings
{
    public interface IProfileCachingSettings
    {
        TimeSpan CachingTime { get; }
        string PhotoKey { get; }
        string FlightHistoryKey { get; }
    }
}