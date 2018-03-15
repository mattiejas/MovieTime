using System.ComponentModel.DataAnnotations;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Ratings.Models
{
    public class Rating
    {
        [Key]
        public string RatingId { get; set; }
        
        [Required]
        public User User { get; set; }
        
        [Required]
        public Movie Movie { get; set; }
        
        [Required]
        public int Value { get; set; }
    }
}