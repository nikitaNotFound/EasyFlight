using System;

namespace WebAPI.Models
{
    public class FlightBookInfo
    {
        public int? Id { get; set; }
        public int? FlightId { get; set; }
        public int SuitcaseOverloadCost { get; set; }
        public int HandLuggageOverloadCost { get; set; }
        public SeatBook[] SeatBooks { get; set; }
    }
}