using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Comments.Models
{
    public class CommentModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapRelations(builder);
            MapPropperties(builder);
        }

        public void MapRelations(ModelBuilder builder)
        {
            var comment = builder.Entity<Comment>();
            
            comment.HasKey(c => c.CommentId);
            comment.HasOne(c => c.Movie);
            comment.HasOne(c => c.User);
        }

        public void MapPropperties(ModelBuilder builder)
        {
            var comment = builder.Entity<Comment>();

            comment.Property(c => c.Value).HasMaxLength(2000).IsRequired();
            comment.Property(c => c.Date).IsRequired();
            comment.Property(c => c.MovieId).IsRequired();
        }
    }
}