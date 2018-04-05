using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMovieModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void MapRelations(ModelBuilder builder)
        {
            var trackedMovie = builder.Entity<TrackedMovie>();

            builder.Entity<TrackedMovie>().HasKey(t => new {t.MovieId, t.UserId});

            trackedMovie.HasOne(m => m.Movie)
                .WithMany(m => m.TrackedMovies)
                .HasForeignKey(t => t.MovieId);

            trackedMovie.HasOne(u => u.User)
                .WithMany(u => u.TrackedMovies)
                .HasForeignKey(t => t.UserId);
        }
    }
}