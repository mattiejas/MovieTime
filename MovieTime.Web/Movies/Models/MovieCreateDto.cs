using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Movies.Models
{
    public class MovieCreateDto : MovieManipulationDto
    {
        [Required(ErrorMessage = "You should provide IMDB ID")]
        public string ImdbId { get; set; }
    }
}
