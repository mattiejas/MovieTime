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
        Task<TrackedMovie> IsMovieTrackedByUser(string userId, string movieId);
        Task<TrackedMovie> ToggleMovieWatchedStatus(string movieId, string userId);
        Task<ICollection<TrackedMovie>> GetTrackedMoviesByUser(string userId);
        Task<bool> UserExist(string userId);
        Task<bool> MovieExist(string movieId);
	}
}