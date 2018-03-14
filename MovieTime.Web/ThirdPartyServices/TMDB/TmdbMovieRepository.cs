using System.Collections.Generic;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
{
    public interface ITmdbMovieRepository : IMovieRepository { }
    
    public class TmdbMovieRepository: ITmdbMovieRepository
    {
        public IEnumerable<Persistance.Database.Movie> GetMoviesByTitleSearch(string title)
        {
            throw new System.NotImplementedException();
        }

        public Movie GetMovieById(string id)
        {
            throw new System.NotImplementedException();
        }

        public Movie GetMovieByTitle(string title)
        {
            throw new System.NotImplementedException();
        }
    }
}