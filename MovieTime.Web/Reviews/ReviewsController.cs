using System.Threading.Tasks;

namespace MovieTime.Web.Reviews
{
    public class ReviewsController
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewsController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        public async Task<Review> AddReview()
        {
            return null;
        }
    }
}