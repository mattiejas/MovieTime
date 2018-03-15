using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Users.Models
{
    public class UserModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapProperties(builder);
        }

        public void MapRelations(ModelBuilder builder)
        {
            var user = builder.Entity<User>();


        }

        public void MapProperties(ModelBuilder builder)
        {
            var user = builder.Entity<User>();
            
            user.HasKey(u => u.Id);
            user.Property(u => u.Id).ValueGeneratedNever();
            user.Property(u => u.FirstName).IsRequired().HasMaxLength(45);
            user.Property(u => u.LastName).IsRequired().HasMaxLength(45);
            user.Property(u => u.Email).IsRequired().HasMaxLength(60);
            user.Property(u => u.ImageUrl).IsRequired(false).HasMaxLength(45);
        }
    }
}