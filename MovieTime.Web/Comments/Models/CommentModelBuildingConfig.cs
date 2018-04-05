using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;

namespace MovieTime.Web.Comments.Models
{
    public class CommentModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void MapRelations(ModelBuilder builder)
        {
            var comment = builder.Entity<Comment>();
            
            comment.HasKey(c => c.CommentId);
            comment.HasOne(c => c.Movie);
            comment.HasOne(c => c.User);
        }
    }
}