
using System.Threading.Tasks;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

namespace MovieTime.Web.Movies
{
    public interface IMovieService
    {
        Task<Movie> GetMovieById(string id);
        Task<Movie> GetMovieByTitle(string title);
        Task<SearchResultsModel> GetMoviesByTitle(string title);
        Task<bool> AddMovie(Movie movie);
        Task<bool> MovieExistById(string movieId);
    }
}
