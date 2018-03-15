using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MovieTime.Web.Reviews
{
    [Route("api")]
    public class ReviewController : Controller
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("movies/{movieId}/reviews/{reviewId}")]
        public async Task<IActionResult> GetMovieReview(string movieId, int reviewId)
        {
            var movieExist = await _reviewService.MovieExist(movieId);
            if (!movieExist) return NotFound();

            var review = await _reviewService.GetReview(reviewId);
            if (review == null) return NotFound();

            return Ok(review);
        }

        [HttpGet("movies/{movieId}/reviews")]
        public async Task<IActionResult> GetAllMovieReviews(string movieId)
        {
            var movieExist = await _reviewService.MovieExist(movieId);
            if (!movieExist) return NotFound();

            var reviews = await _reviewService.GetReviewsOfMovie(movieId);
            
            // Return the list whether it's empty or not. Empty request is still a good request. Don't return NotFound()
            return Ok(reviews);
        }

        [HttpGet("users/{userId}/reviews")]
        public async Task<IActionResult> GetAllUserReviews(string userId)
        {
            var userExist = await _reviewService.UserExist(userId);
            if (!userExist) return NotFound();

            var reviews = await _reviewService.GetReviewsOfUser(userId);

            // Return the list whether it's empty or not. Empty request is still a good request. Don't return NotFound()
            return Ok(reviews);
        }
    }
}