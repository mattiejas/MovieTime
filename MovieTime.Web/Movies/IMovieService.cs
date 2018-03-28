
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

namespace MovieTime.Web.Movies
{
    public interface IMovieService
    {
        Task<Movie> GetMovieById(string id, bool save = true);
        Task<Movie> GetMovieByTitle(string title);
        Task<List<ShortMovieDto>> GetMoviesByTitle(string title, int page);
        Task<bool> AddMovie(Movie movie, bool save = true);
        Task<bool> MovieExistById(string movieId);
    }
}
