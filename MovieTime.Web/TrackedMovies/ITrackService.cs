using System;
using System.Threading.Tasks;
using MovieTime.Web.Tracked.Models;

namespace MovieTime.Web.TrackedMovies
{
    public interface ITrackService
    {
        Task<bool> TrackMovie(TrackedMovie model);
        Task<bool> UntrackMovie(TrackedMovie model);
        Task<TrackedMoviesDto> GetTrackedMoviesByUserId(string userId);
        Task<bool> IsMovieTrackedByUser(string userId, string movieId);
    }
}