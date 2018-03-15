using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using System.Collections.Generic;


namespace MovieTime.Web.Movies
{
    public interface IMovieRespository : IGenericRepository<Movie>
    {
    }
}