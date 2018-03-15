using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieTime.Web.Genres
{
    public class GenreModelBuildingConfig : IEntityModelBuildingConfig
    {
        public void Map(ModelBuilder builder)
        {
            MapProperties(builder);
            //MapRelations(builder);
        }

        public void MapProperties(ModelBuilder builder)
        {
            var genre = builder.Entity<Genre>();

            genre.HasKey(g => g.Name);
        }

        public void MapRelations(ModelBuilder builder)
        {
           
        }
    }
}
