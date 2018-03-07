using System;
using System.Collections.Generic;

namespace MovieTime.Web.MovieDetails
{
    public interface IMovieRepository
    {
//        IEnumerable<MovieDetailsViewModel> GetMovies(int page = 0);
//
//        MovieDetailsViewModel GetMovieById(string id);
//
//        MovieDetailsViewModel GetMoviesByTitle(string id);
//
//        void AddMovie(DbMovie movie);
//
//        void DeleteMovie(Guid id);

        //IEnumerable<DbMovie> GetDatabaseMovies();
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        DbMovie GetMovieById(string id);
        DbMovie GetMovieByTitle(string title);
        void DeleteMovieById(string id);
        void DeleteMovieByTitle(string title);
        void AddMovie(DbMovie movie);
    }
}