using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Users.Models
{
    public class UserModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapPropperties(builder);
        }

        public void MapRelations(ModelBuilder builder)
        {
            var user = builder.Entity<User>();
            
            user.HasKey(u => u.Id);
            user.Property(u => u.Id).ValueGeneratedNever();
        }

        public void MapPropperties(ModelBuilder builder)
        {
            var user = builder.Entity<User>();
            
            user.Property(u => u.Email).IsRequired().HasMaxLength(200);
            user.Property(u => u.FirstName).IsRequired().HasMaxLength(35);
            user.Property(u => u.LastName).IsRequired().HasMaxLength(35);
            user.Property(u => u.UserName).HasMaxLength(35);
        }
    }
}