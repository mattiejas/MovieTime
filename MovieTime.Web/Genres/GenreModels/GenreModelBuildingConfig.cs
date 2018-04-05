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

        public void MapPropperties(ModelBuilder builder)
        {
            var genre = builder.Entity<Genre>();

            genre.Property(g => g.Name).HasMaxLength(100);
        }
        
        public void MapRelations(ModelBuilder builder)
        {
            var genre = builder.Entity<Genre>();

            genre.HasKey(g => g.Name);
        }
    }
}
