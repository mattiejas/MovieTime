using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Genres.GenreModels
{
    public class GenreManipulationDto
    {
        [Required(ErrorMessage = "You should fill out a name for the genre.")]
        [MaxLength(100, ErrorMessage = "The name of genre can not contain more than 100 characters.")]
        public string Name { get; set; }
    }
}