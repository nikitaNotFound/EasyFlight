using System;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Settings
{
    public class ProfileCachingSettings : IProfileCachingSettings
    {
        private readonly IConfiguration _configuration;

        public TimeSpan CachingTime => TimeSpan.Parse(_configuration[nameof(CachingTime)]);
        public string PhotoKey => _configuration[nameof(PhotoKey)];
        public string FlightHistoryKey => _configuration[nameof(FlightHistoryKey)];


        public ProfileCachingSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(ProfileCachingSettings));
        }
    }
}