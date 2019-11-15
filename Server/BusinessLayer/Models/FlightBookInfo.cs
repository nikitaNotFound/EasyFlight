using System;
using Common;

namespace BusinessLayer.Models
{
    public class FlightBookInfo
    {
        public int? Id { get; set; }
        public int FlightId { get; set; }
        public int SuitcaseOverloadCost { get; set; }
        public int HandLuggageOverloadCost { get; set; }
        public BookType BookType { get; set; }
        public DateTimeOffset BookTime { get; set; }
        public int AccountId { get; set; }
        public SeatBook[] SeatBooks { get; set; }
    }
}