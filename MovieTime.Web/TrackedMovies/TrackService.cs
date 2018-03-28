using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.TrackedMovies.Models;
using MovieTime.Web.Users;
using MovieTime.Web.Movies;

namespace MovieTime.Web.TrackedMovies
{
    public class TrackService : ITrackService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITrackRepository _trackRepository;
        private readonly IMovieRespository _movieRepository;
        
        public TrackService(ITrackRepository trackRepository)
        {
            _trackRepository = trackRepository;
        }

        public async Task<bool> TrackMovie(TrackedMovie model)
        {
            var result = await _trackRepository.Add(model);
            return result;
        }

        public async Task<bool> UntrackMovie(TrackedMovie model)
        {
            var result = await _trackRepository.Delete(model);
            return result > 0;
        }

        public async Task<bool> IsMovieTrackedByUser(string userId, string movieId)
        {
            var result = await _trackRepository.Find(t => t.UserId == userId && t.MovieId == movieId);
            return result != null;
        }

        public async Task<TrackedMovie> ToggleMovieWatchedStatus(TrackedMovie trackedMovie)
        {
            trackedMovie.Watched = !trackedMovie.Watched;
            return await _trackRepository.Update(trackedMovie);
        }
    }
}