
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

namespace MovieTime.Web.Movies
{
    public interface IMovieService
    {
        MovieDetailsDto GetMovieDetailsById(string id);
        MovieDetailsDto GetMovieDetailsByTitle(string title);
        SearchResultsModel GetMoviesByTitle(string title);
        void AddMovie(MovieCreateDto movie);
    }
}
