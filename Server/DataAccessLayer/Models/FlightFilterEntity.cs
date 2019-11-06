using System;

namespace DataAccessLayer.Models
{
    public class FlightFilterEntity
    {
        public string NameFilter { get; set; }
        public int? FromAirportId { get; set; }
        public int? ToAirportId { get; set; }
        public int? FromCityId { get; set; }
        public int? ToCityId { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public int? TicketCount { get; set; }
    }
}