namespace DataAccessLayer.Models
{
    public class AirplaneSeatEntity
    {
        public int Id { get; set; }
        public int AirplaneId { get; set; }
        public int Floor { get; set; }
        public int Section { get; set; }
        public int Zone { get; set; }
        public int Row { get; set; }
        public int Number { get; set; }
        public int TypeId { get; set; }
    }
}