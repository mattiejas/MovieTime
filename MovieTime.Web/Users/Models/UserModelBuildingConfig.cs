using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Users.Models
{
    public class UserModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void MapRelations(ModelBuilder builder)
        {
            var user = builder.Entity<User>();
            
            user.HasKey(u => u.Id);
            user.Property(u => u.Id).ValueGeneratedNever();
        }
    }
}