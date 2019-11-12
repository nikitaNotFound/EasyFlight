using System;
using Common;

namespace DataAccessLayer.Models
{
    public class SeatBookEntity
    {
        public int SeatId { get; set; }
        public int Cost { get; set; }
        public int FlightBookInfoId { get; set; }
    }
}