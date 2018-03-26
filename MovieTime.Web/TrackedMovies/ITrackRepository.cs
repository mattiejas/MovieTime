using System;
using MovieTime.Web.Database;
using MovieTime.Web.Tracked.Models;

namespace MovieTime.Web.TrackedMovies
{
    public interface ITrackRepository : IGenericRepository<TrackedMovie>
    {
    }
}