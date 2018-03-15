using System.Threading.Tasks;
using AutoMapper;

namespace MovieTime.Web.Track
{
    public interface ITrackService
    {
        Task<bool> TrackMovie(TrackModel model);
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
    }
}