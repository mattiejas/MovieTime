using MovieTime.Web.Genres.GenreModels;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.Genres.MovieGenreModels
{
    public class MovieGenre
    {
        public string DbMovieId { get; set; }
        public Movie Movie { get; set; }

        public string DbGenreId { get; set; }
        public Genre Genre { get; set; }
    }
}