using System.Threading.Tasks;
using MovieTime.Web.Movie.Repositories;

namespace MovieTime.Web.Movie.Review
{
    public interface IReviewRepository : IGenericRepository<Review>
    {
        Review GetNewestReview(string movieId);
        Task<Review> GetNewestReviewAsync(string movieId);
    }
}