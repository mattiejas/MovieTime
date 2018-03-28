using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.TrackedMovies.Models;

namespace MovieTime.Web.TrackedMovies
{
    public interface ITrackService
    {
        Task<bool> TrackMovie(TrackedMovie model);
        Task<bool> UntrackMovie(TrackedMovie model);
        Task<bool> IsMovieTrackedByUser(string userId, string movieId);
        Task<TrackedMovie> ToggleMovieWatchedStatus(TrackedMovie trackedMovie);
        Task<ICollection<TrackedMovie>> GetTrackedMoviesByUser(string userId);
	}
}