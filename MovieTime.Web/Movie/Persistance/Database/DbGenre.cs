using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Movie.Persistance.Database
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