namespace DataAccessLayer.Models
{
    public class AirplaneFilterEntity
    {
        public string NameFilter { get; set; }
        public int? MinCarryingKg { get; set; }
        public int? MaxCarryingKg { get; set; }
        public int? MinSeatCount { get; set; }
        public int? MaxSeatCount { get; set; }
        public int CurrentPage { get; set; }
        public int PageLimit { get; set; }
    }
}