using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MovieTime.Web.Movies;
using MovieTime.Web.Reviews.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Reviews
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IUserRepository _userRepository;
        private IMovieRespository _movieRespository;

        public ReviewService(IReviewRepository reviewRepository, IUserRepository userRepository, IMovieRespository movieRespository)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
            _movieRespository = movieRespository;
        }

        public async Task<Review> GetReview(int id)
        {
            return await _reviewRepository.Find(x => x.Id == id);
        }

        public async Task<Review> GetReviewConcept(string userId)
        {
            return await _reviewRepository.Find(x => x.UserId == userId && x.IsConcept);
        }

        public async Task<ICollection<Review>> GetAllReviewConcepts(string userId)
        {
            return await _reviewRepository.FindAll(x => x.UserId == userId && x.IsConcept);
        }

        public async Task<ICollection<Review>> GetReviewsOfMovie(string movieId)
        {
            return await _reviewRepository.FindAll(x => x.MovieId == movieId);
        }

        public async Task<ICollection<Review>> GetReviewsOfUser(string userId)
        {
            return await _reviewRepository.FindAll(x => x.UserId == userId && x.IsConcept == false);
        }

        public async void AddReview(Review review)
        {
            throw new System.NotImplementedException();
        }

        public async void EditReview(Review review)
        {
            throw new System.NotImplementedException();
        }

        public async void DeleteReview(int reviewId)
        {
            throw new System.NotImplementedException();
        }

        public async void DeleteReviewsOfMovie(string movieId)
        {
            throw new System.NotImplementedException();
        }

        public async void DeleteReviewsOfUser(string userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> UserExist(string userId)
        {
            var countMatches = await _userRepository.CountMatch(x => x.Id == userId);
            return countMatches > 0;
        }

        public async Task<bool> MovieExist(string movieId)
        {
            var countMatches = await _movieRespository.CountMatch(x => x.Id == movieId);
            return countMatches > 0;
        }
    }
}