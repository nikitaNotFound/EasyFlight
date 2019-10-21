namespace DataAccessLayer.Models
{
    public class AirplaneSeatTypeEntity
    {
        public int Id { get; set; }
        public int AirplaneId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public int Cost { get; set; }
    }
}