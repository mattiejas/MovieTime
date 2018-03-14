using System.Collections.Generic;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
{
    public interface IMovieRepository
    {
        IEnumerable<Persistance.Database.Movie> GetMoviesByTitleSearch(string title);
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        Movie GetMovieById(string id);
        Movie GetMovieByTitle(string title);
    }
}