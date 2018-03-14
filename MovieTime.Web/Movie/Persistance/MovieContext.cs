using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Movie.Persistance.Database;
using MovieTime.Web.Users;

namespace MovieTime.Web.Movie.Persistance
{
    public class MovieContext : DbContext
    {
        public DbSet<DbMovie> Movies { get; set; }
        public DbSet<DbGenre> Genres { get; set; }
        public DbSet<DbMovieGenre> MovieGenre { get; set; }
        
        public DbSet<UserModel> Users { get; set; }

        public MovieContext(DbContextOptions<MovieContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DbMovieGenre>()
                .HasKey(mg => new {mg.DbMovieId, mg.DbGenreId});

            modelBuilder.Entity<DbMovieGenre>()
                .HasOne(mg => mg.Movie)
                .WithMany(g => g.Genres)
                .HasForeignKey(mg => mg.DbMovieId);

            modelBuilder.Entity<DbMovieGenre>()
                .HasOne(mg => mg.Genre)
                .WithMany(m => m.Movies)
                .HasForeignKey(mg => mg.DbGenreId);
        }
    }
}