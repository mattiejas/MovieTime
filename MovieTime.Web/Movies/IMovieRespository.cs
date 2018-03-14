using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using System.Collections.Generic;


namespace MovieTime.Web.Movies
{
    public interface IMovieRespository : IGenericRepository<Movie>
    {
        IEnumerable<Movie> GetMoviesByTitleSearch(string title);
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        Movie GetMovieById(string id);
        Movie GetMovieByTitle(string title);

        void DeleteMovieById(string id);
        void DeleteMovieByTitle(string title);
        void AddMovie(Movie movie);
        void Save();


    }
}