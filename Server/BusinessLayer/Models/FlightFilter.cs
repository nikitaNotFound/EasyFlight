using System;

namespace BusinessLayer.Models
{
    public class FlightFilter
    {
        public string NameFilter { get; set; }
        public int? FromAirportId { get; set; }
        public int? ToAirportId { get; set; }
        public int? FromCityId { get; set; }
        public int? ToCityId { get; set; }
        public DateTimeOffset? DepartureTime { get; set; }
        public DateTimeOffset? ArrivalTime { get; set; }
        public bool SearchFlightsBack { get; set; }
    }
}