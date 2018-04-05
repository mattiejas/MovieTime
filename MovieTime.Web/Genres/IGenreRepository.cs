using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Database;
using MovieTime.Web.Genres.GenreModels;

namespace MovieTime.Web.Genres
{
    public interface IGenreRepository : IGenericRepository<Genre>
    {
    }
}