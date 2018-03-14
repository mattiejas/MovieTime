using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Movie.Persistance.Database
{
    public class Genre
    {
        [Key]
        public string Name { get; set; }
        
        public ICollection<MovieGenre> Movies { get; set; }

    }
}