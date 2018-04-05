using System.Collections.Generic;
using MovieTime.Web.Genres.MovieGenreModels;

namespace MovieTime.Web.Genres.GenreModels
{
    public class Genre
    {
        public string Name { get; set; }
                
        public ICollection<MovieGenre> Movies { get; set; }

    }
}