using System;
using Microsoft.Extensions.Configuration;

namespace BusinessLayer
{
    public class BookingSettings : IBookingSettings
    {
        private readonly IConfiguration _configuration;

        public TimeSpan ExpirationTime => TimeSpan.Parse(_configuration[nameof(ExpirationTime)]);


        public BookingSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(BookingSettings));
        }
    }
}