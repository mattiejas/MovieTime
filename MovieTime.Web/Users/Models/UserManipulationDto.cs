using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Users.Models
{
    public abstract class UserManipulationDto
    {
        [MaxLength(200, ErrorMessage = "Username should not be longer than 200 characters.")]
        public string UserName { get; set; }
        
        [Required(ErrorMessage = "First name is required.")]
        [MaxLength(35, ErrorMessage = "First name can not be longer than 35 characters")]
        public string FirstName { get; set; }
        
        [Required(ErrorMessage = "Last name is required.")]
        [MaxLength(35, ErrorMessage = "Last name should not be longer than 35 characters")]
        public string LastName { get; set; }
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [MaxLength(200, ErrorMessage = "Email should not be l onger than 200 characters")]
        public string Email { get; set; }
        
        public string ImageUrl { get; set; }
    }
}