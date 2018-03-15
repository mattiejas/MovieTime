using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MovieTime.Web.Database
{
    public interface IEntityModelBuildingConfig
    {
        void Map(ModelBuilder builder);
        void MapRelations(ModelBuilder builder);
        void MapProperties(ModelBuilder builder);
    }
}