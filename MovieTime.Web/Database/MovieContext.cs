using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Movie.Persistance.Database;
using MovieTime.Web.Users;

namespace MovieTime.Web.Movie.Persistance
{
    public class MovieContext : DbContext
    {
        public virtual DbSet<Database.Movie> Movies { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
        public virtual DbSet<MovieGenre> MovieGenre { get; set; }
        
        public virtual DbSet<User> Users { get; set; }

        public MovieContext(DbContextOptions<MovieContext> options) : base(options) { }

        public MovieContext() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MovieGenre>()
                .HasKey(mg => new {mg.DbMovieId, mg.DbGenreId});

            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Movie)
                .WithMany(mv => mv.Genres)
                .HasForeignKey(mg => mg.DbMovieId);

            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Genre)
                .WithMany(m => m.Movies)
                .HasForeignKey(mg => mg.DbGenreId);
        }
    }
}