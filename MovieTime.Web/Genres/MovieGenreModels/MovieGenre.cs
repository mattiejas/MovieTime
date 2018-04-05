using MovieTime.Web.Genres.GenreModels;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.Genres.MovieGenreModels
{
    public class MovieGenre
    {
        public string MovieId { get; set; }
        public Movie Movie { get; set; }

        public string GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}