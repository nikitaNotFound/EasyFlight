namespace DataAccessLayer.Models
{
    public class PaginationAirplaneEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CarryingKg { get; set; }
        public int TotalCount { get; set; }
    }
}