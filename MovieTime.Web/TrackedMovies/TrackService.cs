using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
    
    public class TrackService : ITrackService
    {
        private readonly ITrackRepository _trackRepository;
        private IMapper _mapper;
        
        public TrackService(ITrackRepository trackRepository, IMapper mapper)
        {
            _trackRepository = trackRepository;
            _mapper = mapper;
        }
        
        public Task<bool> TrackMovie(TrackedMovie model) => _trackRepository.TrackMovie(model);

        public Task<bool> UntrackMovie(TrackedMovie model) => _trackRepository.UntrackMovie(model);

        public async Task<TrackedMoviesDto> GetTrackedMoviesByUserId(string userId)
        {
            var trackModels = await _trackRepository.GetTrackedMoviesByUserId(userId);
            var movies = trackModels.Select(x => x.MovieId).ToList();
            
            return new TrackedMoviesDto{ userId = userId, movieIds = movies };
        }

        public async Task<bool> IsMovieTrackedByUser(string userId, string movieId)
        {
            return await _trackRepository.IsMovieTrackedByUser(userId, movieId);
        }
    }
}