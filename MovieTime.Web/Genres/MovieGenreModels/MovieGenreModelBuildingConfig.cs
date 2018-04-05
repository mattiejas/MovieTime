using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Genres.MovieGenreModels
{
    public class MovieGenreModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapPropperties(builder);
        }
        public void MapRelations(ModelBuilder builder)
        {
            var movieGenre = builder.Entity<MovieGenre>();
            
            movieGenre.HasKey(mg => new {mg.MovieId, mg.GenreId});

            movieGenre.HasOne(mg => mg.Movie)
                .WithMany(mv => mv.Genres)
                .HasForeignKey(mg => mg.MovieId);

            movieGenre.HasOne(mg => mg.Genre)
                .WithMany(m => m.Movies)
                .HasForeignKey(mg => mg.GenreId);
        }

        public void MapPropperties(ModelBuilder builder)
        {
            // No need to configure properties.
        }
    }
}