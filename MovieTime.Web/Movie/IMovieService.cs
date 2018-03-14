using MovieTime.Web.Movie.Persistance.Database;
using MovieTime.Web.Movie.Persistance.Omdb;
using MovieTime.Web.Movie.Persistance.ViewModels;

namespace MovieTime.Web.Movie.Services
{
    public interface IMovieService
    {
        MovieDetailsDto GetMovieDetailsById(string id);
        MovieDetailsDto GetMovieDetailsByTitle(string title);
        SearchResultsModel GetMoviesByTitle(string title);
        void AddMovie(MovieCreateDto movie);
    }
}
