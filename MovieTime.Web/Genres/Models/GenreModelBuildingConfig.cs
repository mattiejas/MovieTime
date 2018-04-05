using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Genres.Models
{
    public class GenreModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void MapRelations(ModelBuilder builder)
        {
            var genre = builder.Entity<Genre>();

            genre.HasKey(g => g.Name);
        }
    }
}
