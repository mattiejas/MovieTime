using System;
using System.Threading.Tasks;
using MovieTime.Web.Database;
using MovieTime.Web.TrackedMovies.Models;

namespace MovieTime.Web.TrackedMovies
{
    public interface ITrackRepository : IGenericRepository<TrackedMovie>
    {
    }
}