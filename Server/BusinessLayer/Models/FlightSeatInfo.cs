using System;

namespace BusinessLayer.Models
{
    public class FlightSeatInfo
    {
        public int FlightId { get; set; }
        public int AccountId { get; set; }
        public int SeatId { get; set; }
        public int AirplaneId { get; set; }
        public DateTimeOffset BookTime { get; set; }
    }
}