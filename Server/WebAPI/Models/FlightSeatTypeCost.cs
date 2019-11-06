namespace WebAPI.Models
{
    public class FlightSeatTypeCost
    {
        public int? FlightId { get; set; }
        public int SeatTypeId { get; set; }
        public int Cost { get; set; }
    }
}