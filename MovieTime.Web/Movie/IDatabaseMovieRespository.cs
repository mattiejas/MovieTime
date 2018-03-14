using MovieTime.Web.Movie.Persistance.Database;
using System.Collections.Generic;

namespace MovieTime.Web.Movie.Repositories
{
    public interface IDatabaseMovieRespository : IGenericRepository<Persistance.Database.Movie>
    {
        IEnumerable<Persistance.Database.Movie> GetMoviesByTitleSearch(string title);
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        Movie GetMovieById(string id);
        Movie GetMovieByTitle(string title);

        void DeleteMovieById(string id);
        void DeleteMovieByTitle(string title);
        void AddMovie(Persistance.Database.Movie movie);
        void Save();


    }
}