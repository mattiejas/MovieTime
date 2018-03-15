using Microsoft.EntityFrameworkCore;

namespace MovieTime.Web.Track
{
    public class TrackContext : DbContext
    {
        public DbSet<TrackModel> Tracks { get; set; }
        
        public TrackContext(DbContextOptions<TrackContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TrackModel>()
                .HasKey(t => new { t.MovieId, t.UserId });
        }
    }
}