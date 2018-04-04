using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.Movies
{
    public interface IMovieRespository : IGenericRepository<Movie>
    {
        Task<Movie> GetMovieWithGenre(Expression<Func<Movie, bool>> match);
    }
}