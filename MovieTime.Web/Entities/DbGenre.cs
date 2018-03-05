using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Entities
{
    public class DbGenre
    {
        [Key]
        public string Name { get; set; }
        
        [Required]
        public bool CustomField { get; set; }

        public ICollection<DbMovieGenre> Movies { get; set; }

    }
}