using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MovieTime.Web.Database
{
    public interface IEntityModelBuildingConfig
    {
        void MapRelations(ModelBuilder builder);
    }
}