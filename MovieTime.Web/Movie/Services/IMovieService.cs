using MovieTime.Web.Movie.Persistance.Database;
using MovieTime.Web.Movie.Persistance.Omdb;
using MovieTime.Web.Movie.Persistance.ViewModels;

namespace MovieTime.Web.Movie.Services
{
    public interface IMovieService
    {
        MovieDetailsViewModel GetMovieDetailsById(string id);
        MovieDetailsViewModel GetMovieDetailsByTitle(string title);
        SearchResultsModel GetMoviesByTitle(string title);
        void AddMovie(MovieForCreationDto movie);
    }
}
