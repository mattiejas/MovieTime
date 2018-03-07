using MovieTime.Web.Models;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Services
{
    public interface IMovieService
    {
        MovieDetailsViewModel GetMovieDetailsById(string id);
        MovieDetailsViewModel GetMovieDetailsByTitle(string title);
        SearchResultsModel GetMoviesByTitle(string title);
        void AddMovie(MovieForCreationDto movie);
    }
}
