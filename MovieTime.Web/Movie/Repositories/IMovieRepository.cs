using System.Collections.Generic;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
{
    public interface IMovieRepository
    {
        IEnumerable<DbMovie> GetMoviesByTitleSearch(string title);
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        DbMovie GetMovieById(string id);
        DbMovie GetMovieByTitle(string title);
    }
}