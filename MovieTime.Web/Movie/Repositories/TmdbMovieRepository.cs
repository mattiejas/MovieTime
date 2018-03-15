using System.Collections.Generic;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
{
    public interface ITmdbMovieRepository : IMovieRepository { }
    
    public class TmdbMovieRepository: ITmdbMovieRepository
    {
        public IEnumerable<DbMovie> GetMoviesByTitleSearch(string title)
        {
            throw new System.NotImplementedException();
        }

        public DbMovie GetMovieById(string id)
        {
            throw new System.NotImplementedException();
        }

        public DbMovie GetMovieByTitle(string title)
        {
            throw new System.NotImplementedException();
        }
    }
}