using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.Movies
{
    public interface IMovieRespository : IGenericRepository<Movie>
    {
    }
}