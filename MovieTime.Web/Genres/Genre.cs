using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Genres
{
    public class Genre
    {
        public string Name { get; set; }
        
        public ICollection<MovieGenre> Movies { get; set; }

    }
}