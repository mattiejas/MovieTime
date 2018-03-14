using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.Movie.Review
{
    public interface IReviewService
    {
        Review GetReview(int id);
        Task<Review> GetReviewAsync(int id);

        ICollection<Review> GetMovieReviews(string movieId);
        Task<ICollection<Review>> getMovieReviewsAsync(string movieId);

        ICollection<Review> GetUserReviews(string userId);
        Task<ICollection<Review>> GetUserReviewsAsync(string userId);

        void AddReview(Review review);
        void AddReviewAsync(Review review);

        void EditReview(Review review);
        void EditReviewAsync(Review review);

        void DeleteReview(int reviewId);
        void DeleteReviewAsync(int reviewId);

        void DeleteAllReviews(string movieId);
        void DeleteAllReviewsAsync(string movieId);
    }
}