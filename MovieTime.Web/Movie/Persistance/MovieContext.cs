using Microsoft.EntityFrameworkCore;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Entities
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {
            //Database.Migrate();
        }

        public MovieContext(){
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbMovieGenre>()
                        .HasKey(mg => new { mg.DbMovieId, mg.DbGenreId });

            modelBuilder.Entity<DbMovieGenre>()
                        .HasOne(mg => mg.Movie)
                        .WithMany(g => g.Genres)
                        .HasForeignKey(mg => mg.DbMovieId);

            modelBuilder.Entity<DbMovieGenre>()
                        .HasOne(mg => mg.Genre)
                        .WithMany(m => m.Movies)
                        .HasForeignKey(mg => mg.DbGenreId);
        }

        public DbSet<DbMovie> Movies { get; set; }
        public DbSet<DbGenre> Genres { get; set; }
        public DbSet<DbMovieGenre> MovieGenre { get; set; }
   
    }
}