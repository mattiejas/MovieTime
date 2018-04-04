using System.Collections.Generic;

namespace MovieTime.Web.Genres.Models
{
    public class Genre
    {
        public string Name { get; set; }
                
        public ICollection<MovieGenre> Movies { get; set; }

    }
}