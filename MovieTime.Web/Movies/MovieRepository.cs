using System;
using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MovieTime.Web.Movies
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRespository
    {
        public MovieRepository(MovieContext context) : base(context)
        {
        }

        public async Task<Movie> GetMovieWithGenre(Expression<Func<Movie, bool>> match)
        {
            return await GetDbSet()
                .Include(m => m.Genres)
                .FirstOrDefaultAsync(match);    
        }
    }
}