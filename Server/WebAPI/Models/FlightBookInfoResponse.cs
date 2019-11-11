using Common;

namespace WebAPI.Models
{
    public class FlightBookInfoResponse
    {
        public int FlightId { get; set; }
        public int SeatId { get; set; }
        public BookType BookType { get; set; }
    }
}