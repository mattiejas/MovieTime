using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Reviews.Models;

namespace MovieTime.Web.Reviews
{
    public interface IReviewService
    {
        Task<Review> GetReview(int id);
        Task<Review> GetReviewConcept(Guid userId);
        Task<ICollection<Review>> GetAllReviewConcepts(Guid userId);
        Task<ICollection<Review>> GetReviewsOfMovie(string movieId);
        Task<ICollection<Review>> GetReviewsOfUser(Guid userId);
        void AddReview(Review review);
        void EditReview(Review review);
        void DeleteReview(int reviewId);
        void DeleteReviewsOfMovie(string movieId);
        void DeleteReviewsOfUser(Guid userId);
        Task<bool> UserExist(Guid userId);
        Task<bool> MovieExist(string movieId);
    }
}