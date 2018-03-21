using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieTime.Web.Reviews.Models
{
    public class ReviewModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapProperties(builder);
            MapRelations(builder);
        }

        public void MapProperties(ModelBuilder builder)
        {
            var review = builder.Entity<Review>();

            review.HasKey(r => r.Id);
            review.Property(r => r.AddedDateTime).IsRequired();
        }

        public void MapRelations(ModelBuilder builder)
        {
            var review = builder.Entity<Review>();

            review.HasOne(r => r.Movie)
                .WithMany().HasForeignKey(r => r.MovieId);
        }
    }
}
