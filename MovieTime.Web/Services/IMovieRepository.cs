using System;
using System.Collections.Generic;

namespace MovieTime.Web.MovieDetails
{
    public interface IMovieRepository
    {
        IEnumerable<DbMovie> GetMoviesByTitleSearch(string title);
        //IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0);
        DbMovie GetMovieById(string id);
        DbMovie GetMovieByTitle(string title);
       
    }
}