using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieTime.Web.Database;
using MovieTime.Web.Genres.GenreModels;

namespace MovieTime.Web.Genres
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        public GenreRepository(MovieContext context) : base(context)
        {
        }
    }
}