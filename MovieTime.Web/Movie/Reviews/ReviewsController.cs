using System.Threading.Tasks;

namespace MovieTime.Web.Movie.Review
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
            
        }
    }
}