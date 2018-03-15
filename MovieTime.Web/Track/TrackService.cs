using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace MovieTime.Web.Track
{
    public interface ITrackService
    {
        Task<bool> TrackMovie(TrackModel model);
        Task<bool> UntrackMovie(TrackModel model);
        Task<TrackedMoviesDTO> GetTrackedMoviesByUserId(string userId);
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
        
        public Task<bool> TrackMovie(TrackModel model) => _trackRepository.TrackMovie(model);

        public Task<bool> UntrackMovie(TrackModel model) => _trackRepository.UntrackMovie(model);

        public async Task<TrackedMoviesDTO> GetTrackedMoviesByUserId(string userId)
        {
            var trackModels = await _trackRepository.GetTrackedMoviesByUserId(userId);
            var movies = trackModels.Select(x => x.MovieId).ToList();
            
            return new TrackedMoviesDTO{ userId = userId, movieIds = movies };
        }

        public async Task<bool> IsMovieTrackedByUser(string userId, string movieId)
        {
            return await _trackRepository.IsMovieTrackedByUser(userId, movieId);
        }
    }
}