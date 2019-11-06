using System;

namespace WebAPI.Models
{
    public class Flight
    {
        public int? Id { get; set; }
        public int FromAirportId { get; set; }
        public int ToAirportId { get; set; }
        public DateTimeOffset DepartureTime { get; set; }
        public DateTimeOffset ArrivalTime { get; set; }
        public int AirplaneId { get; set; }
        public int SuitcaseMassKg { get; set; }
        public int SuitcaseCount { get; set; }
        public int HandLuggageMassKg { get; set; }
        public int HandLuggageCount { get; set; }
        public int MassOverloadKgCost { get; set; }
    }
}