using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.Movie.Review
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewService(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }
        
//        public Review GetReview(int id)
//        {
//            return _reviewRepository.Get(id);
//        }
// 
//        public async Task<Review> GetReviewAsync(int id)
//        {
//            return await _reviewRepository.GetAsync(id);
//        }
//
//        public ICollection<Review> GetMovieReviews(string movieId)
//        {
//            return _reviewRepository.FindAll(x => x.MovieId == movieId);
//        }
//
//        public async Task<ICollection<Review>> getMovieReviewsAsync(string movieId)
//        {
//            return await _reviewRepository.FindAllAsync(x => x.MovieId == movieId);
//        }

        public Review GetReview(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<Review> GetReviewAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public ICollection<Review> GetMovieReviews(string movieId)
        {
            throw new System.NotImplementedException();
        }

        public Task<ICollection<Review>> getMovieReviewsAsync(string movieId)
        {
            throw new System.NotImplementedException();
        }

        public ICollection<Review> GetUserReviews(string userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<ICollection<Review>> GetUserReviewsAsync(string userId)
        {
            throw new System.NotImplementedException();
        }

        public void AddReview(Review review)
        {
            throw new System.NotImplementedException();
        }

        public void AddReviewAsync(Review review)
        {
            throw new System.NotImplementedException();
        }

        public void EditReview(Review review)
        {
            throw new System.NotImplementedException();
        }

        public void EditReviewAsync(Review review)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteReview(int reviewId)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteReviewAsync(int reviewId)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteAllReviews(string movieId)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteAllReviewsAsync(string movieId)
        {
            throw new System.NotImplementedException();
        }
    }
}