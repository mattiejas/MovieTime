using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Genres.GenreModels
{
    public class GenreModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapPropperties(builder);
        }

        public void MapRelations(ModelBuilder builder)
        {
            var genre = builder.Entity<Genre>();

            genre.HasKey(g => g.Name);
        }

        public void MapPropperties(ModelBuilder builder)
        {
        }
        
    }
}
