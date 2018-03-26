using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MovieTime.Web.Movies
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRespository
    {
        public MovieRepository(MovieContext context) : base(context)
        {
        }
    }
}