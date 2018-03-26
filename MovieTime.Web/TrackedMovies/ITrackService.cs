using System;
using System.Threading.Tasks;
using MovieTime.Web.TrackedMovies.Models;

namespace MovieTime.Web.TrackedMovies
{
    public interface ITrackService
    {
        Task<bool> TrackMovie(TrackedMovie model);
        Task<bool> UntrackMovie(TrackedMovie model);
        Task<bool> IsMovieTrackedByUser(string userId, string movieId);
    }
}