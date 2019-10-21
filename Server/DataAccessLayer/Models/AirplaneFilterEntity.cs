namespace DataAccessLayer.Models
{
    public class AirplaneFilterEntity
    {
        public string Name { get; set; }
        public int MinCarrying { get; set; }
        public int MaxCarrying { get; set; }
        public int MinSeatCount { get; set; }
        public int MaxSeatCount { get; set; }
    }
}