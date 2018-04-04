using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.ThirdPartyServices
{
    public interface IThirdPartyMovieRepository
    {
        Task<SearchResultsModel> GetMoviesByTitle(string title, int page = 1);
        Task<Movie> GetMovieById(string id);
        Task<Movie> GetMovieByTitle(string title);
    }
}