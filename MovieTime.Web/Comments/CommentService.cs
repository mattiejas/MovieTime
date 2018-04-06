using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Comments.Models;
using MovieTime.Web.Movies;
using MovieTime.Web.Users;

namespace MovieTime.Web.Comments
{
    public interface ICommentService
    {
        Task<ICollection<Comment>> AllCommentsForMovie(string movieId);
        Task<ICollection<Comment>> AllCommentsByUser(string userId);
        Task<bool> CreateComment(Comment comment);
    }

    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }
        
        public async Task<bool> CreateComment(Comment comment)
        {
            comment.Date = DateTime.Now;
            var c = await _commentRepository.Add(comment);
            return c != null;
        }

        public async Task<ICollection<Comment>> AllCommentsByUser(string userId)
        {
            var comments = await _commentRepository.FindAll(x => x.User.Id == userId);
            return comments;
        }

        public async Task<ICollection<Comment>> AllCommentsForMovie(string movieId)
        {
            var comments = await _commentRepository.FindAll(x => x.Movie.Id == movieId);
            SetUndefinedUsersToDeleted(comments);
            return comments;
        }

        private void SetUndefinedUsersToDeleted(ICollection<Comment> comments)
        {
            foreach (var comment in comments)
            {
                if (comment.User != null) continue;
                comment.User = new User()
                {
                    Email = "Deleted",
                    FirstName = "User",
                    Id = "0000000000000000000000000000",
                    ImageUrl = "Deleted",
                    LastName = "Deleted",
                    TrackedMovies = null,
                    UserName = "Deleted"
                };
                comment.UserId = "0000000000000000000000000000";
            }
        }
    }
}