namespace BusinessLayer.Models
{
    public class AirplaneSeatType
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int AirplaneId { get; set; }
        public string Color { get; set; }
    }
}