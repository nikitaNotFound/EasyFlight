using System;

namespace WebAPI.Models
{
    public class FlightFilter
    {
        public int? FromAirportId { get; set; }
        public int? ToAirportId { get; set; }
        public int? FromCityId { get; set; }
        public int? ToCityId { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public int? TicketCount { get; set; }
        public bool SearchFlightsBack { get; set; }


        public FlightFilter(
            int? fromAirportId,
            int? toAirportId,
            int? fromCityId,
            int? toCityId,
            DateTime? departureDate,
            DateTime? arrivalDate,
            int? ticketCount,
            bool searchFlightsBack
        )
        {
            FromAirportId = fromAirportId;
            ToAirportId = toAirportId;
            FromCityId = fromCityId;
            ToCityId = toCityId;
            DepartureDate = departureDate;
            ArrivalDate = arrivalDate;
            TicketCount = ticketCount;
            SearchFlightsBack = searchFlightsBack;
        }
    }
}