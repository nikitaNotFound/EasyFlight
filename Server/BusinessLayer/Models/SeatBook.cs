using System;
using Common;

namespace BusinessLayer.Models
{
    public class SeatBook
    {
        public int SeatId { get; set; }
        public int Cost { get; set; }
        public int FlightBookInfoId { get; set; }
    }
}