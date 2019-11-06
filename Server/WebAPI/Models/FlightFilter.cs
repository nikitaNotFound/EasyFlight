using System;

namespace WebAPI.Models
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


        public FlightFilter(
            string nameFilter,
            int? fromAirportId,
            int? toAirportId,
            int? fromCityId,
            int? toCityId,
            DateTimeOffset? departureTime,
            DateTimeOffset? arrivalTime,
            bool searchFlightsBack
        )
        {
            NameFilter = nameFilter;
            FromAirportId = fromAirportId;
            ToAirportId = toAirportId;
            FromCityId = fromCityId;
            ToCityId = toCityId;
            DepartureTime = departureTime;
            ArrivalTime = arrivalTime;
            SearchFlightsBack = searchFlightsBack;
        }
    }
}