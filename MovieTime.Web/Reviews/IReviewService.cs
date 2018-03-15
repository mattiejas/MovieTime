using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Reviews.Models;

namespace MovieTime.Web.Reviews
{
    public interface IReviewService
    {
        Task<Review> GetReview(int id);
        Task<Review> GetReviewConcept(string userId);
        Task<ICollection<Review>> GetAllReviewConcepts(string userId);
        Task<ICollection<Review>> GetReviewsOfMovie(string movieId);
        Task<ICollection<Review>> GetReviewsOfUser(string userId);
        void AddReview(Review review);
        void EditReview(Review review);
        void DeleteReview(int reviewId);
        void DeleteReviewsOfMovie(string movieId);
        void DeleteReviewsOfUser(string userId);
        Task<bool> UserExist(string userId);
        Task<bool> MovieExist(string movieId);
    }
}