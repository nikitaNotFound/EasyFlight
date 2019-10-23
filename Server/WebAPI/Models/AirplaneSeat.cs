using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class AirplaneSeat
    {
        public int Id { get; set; }
        
        [Required]
        public int AirplaneId { get; set; }
        
        [Required]
        public int Floor { get; set; }
        
        [Required]
        public int Section { get; set; }
        
        [Required]
        public int Zone { get; set; }
        
        [Required]
        public int Row { get; set; }
        
        [Required]
        public int Number { get; set; }
        
        [Required]
        public int TypeId { get; set; }
    }
}