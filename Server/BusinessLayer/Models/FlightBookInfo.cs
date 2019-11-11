using System;
using Common;

namespace BusinessLayer.Models
{
    public class FlightBookInfo
    {
        public int FlightId { get; set; }
        public int? AccountId { get; set; }
        public int SeatId { get; set; }
        public BookType? BookType { get; set; }
        public DateTimeOffset? BookTime { get; set; }
    }
}