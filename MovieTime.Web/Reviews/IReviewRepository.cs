using MovieTime.Web.Database;
using System.Threading.Tasks;

namespace MovieTime.Web.Reviews
{
    public interface IReviewRepository : IGenericRepository<Review>
    {
        Review GetNewestReview(string movieId);
        Task<Review> GetNewestReviewAsync(string movieId);
    }
}