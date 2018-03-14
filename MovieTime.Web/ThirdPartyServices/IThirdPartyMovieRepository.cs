using MovieTime.Web.Movies.Models;
using System.Collections.Generic;

namespace MovieTime.Web.ThirdPartyServices
{
    public interface IThirdPartyMovieRepository
    {
        IEnumerable<Movie> GetMoviesByTitleSearch(string title);
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        Movie GetMovieById(string id);
        Movie GetMovieByTitle(string title);
    }
}