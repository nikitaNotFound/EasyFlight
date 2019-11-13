﻿using System;
using Microsoft.Extensions.Configuration;

namespace DataAccessLayer
{
    public class BookingSettings : IBookingSettings
    {
        private readonly IConfiguration _configuration;

        public TimeSpan ExpirationTime => TimeSpan.Parse(_configuration[nameof(ExpirationTime)]);
        public TimeSpan TimeUntilBookingAvailable
            => TimeSpan.Parse(_configuration[nameof(TimeUntilBookingAvailable)]);


        public BookingSettings(IConfiguration configuration)
        {
            _configuration = configuration.GetSection(nameof(BookingSettings));
        }
    }
}