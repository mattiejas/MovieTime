using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.TrackedMovies.Models;

namespace MovieTime.Web.TrackedMovies
{
    public class TrackService : ITrackService
    {
        private readonly ITrackRepository _trackRepository;
        private IMapper _mapper;
        
        public TrackService(ITrackRepository trackRepository, IMapper mapper)
        {
            _trackRepository = trackRepository;
            _mapper = mapper;
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
    }
}