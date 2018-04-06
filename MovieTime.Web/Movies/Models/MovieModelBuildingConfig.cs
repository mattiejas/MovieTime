using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Movies.Models
{
    public class MovieModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapPropperties(builder);
        }

        public void MapRelations(ModelBuilder builder)
        {
            var movie = builder.Entity<Movie>();

            movie.HasKey(m => m.Id);
            movie.Property(m => m.Id).ValueGeneratedNever();
        }

        public void MapPropperties(ModelBuilder builder)
        {
            var movie = builder.Entity<Movie>();

            movie.Property(m => m.Title).IsRequired().HasMaxLength(2000);
            movie.Property(m => m.Year).IsRequired();
            movie.Property(m => m.Poster).IsRequired();
            movie.Property(m => m.RunTimeInMinutes).IsRequired();
            movie.Property(m => m.Director).IsRequired().HasMaxLength(2000);
            movie.Property(m => m.Writer).IsRequired().HasMaxLength(2000);
            movie.Property(m => m.Actors).IsRequired().HasMaxLength(2000);
            movie.Property(m => m.Plot).IsRequired().HasMaxLength(4000);
        }
    }
}