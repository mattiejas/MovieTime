using MovieTime.Web.Movies.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.ThirdPartyServices
{
    public interface IThirdPartyMovieRepository
    {
        Task<IEnumerable<Movie>> GetMoviesByTitleSearch(string title);
        Task<Movie> GetMovieById(string id);
        Task<Movie> GetMovieByTitle(string title);
    }
}