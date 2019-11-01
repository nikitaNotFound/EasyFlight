using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class AirplaneSeatType
    {
        public int? Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        public int AirplaneId { get; set; }

        [Required]
        public string Color { get; set; }
    }
}