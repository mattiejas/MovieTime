using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Comments.Models
{
    public class CommentModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapProperties(builder);
        }

        public void MapRelations(ModelBuilder builder)
        {
            var comment = builder.Entity<Comment>();
            comment.HasOne(c => c.Movie);
            comment.HasOne(c => c.User);
        }

        public void MapProperties(ModelBuilder builder)
        {
            var comment = builder.Entity<Comment>();
            comment.HasKey(c => c.CommentId);
            comment.Property(c => c.Date).IsRequired();
            comment.Property(c => c.Value).IsRequired().HasMaxLength(2000);
        }
    }
}