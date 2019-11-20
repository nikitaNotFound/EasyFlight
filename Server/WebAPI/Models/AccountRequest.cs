using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class AccountRequest
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
