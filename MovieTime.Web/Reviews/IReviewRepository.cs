using MovieTime.Web.Database;
using System.Threading.Tasks;
using MovieTime.Web.Reviews.Models;

namespace MovieTime.Web.Reviews
{
    public interface IReviewRepository : IGenericRepository<Review>
    {
        Task<Review> GetNewestReview(string movieId);
    }
}