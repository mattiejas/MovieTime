using System.Threading.Tasks;
using MovieTime.Web.Ratings.Models;

namespace MovieTime.Web.Ratings
{
    public interface IRatingService
    {
        Task<bool> AddRating(RatingCreateDto dto);
        Task<int> GetByMovieAndUser(RatingGetDto dto);
        Task<int> GetAverageMovieRating(string movieId);
    }
    
    public class RatingService : IRatingService
    {
        public RatingService()
        {
            
        }
        
        public Task<bool> AddRating(RatingCreateDto dto)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> GetByMovieAndUser(RatingGetDto dto)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> GetAverageMovieRating(string movieId)
        {
            throw new System.NotImplementedException();
        }
    }
}