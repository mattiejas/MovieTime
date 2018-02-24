using Microsoft.EntityFrameworkCore;

namespace MovieTime.Web.Entities
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options) : base(options)
        {
            Database.Migrate();
        }

        public DbSet<DbMovie> Movies { get; set; }
   
    }
}