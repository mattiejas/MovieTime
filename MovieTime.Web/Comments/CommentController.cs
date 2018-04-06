using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Auth;
using MovieTime.Web.Comments.Models;
using MovieTime.Web.Helpers;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Comments
{
    [Route("api/comments")]
    public class CommentController : Controller
    {
        private readonly ICommentService _service;
        private readonly IMapper _mapper;

        public CommentController(ICommentService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet("movie/{movieId}")]
        public async Task<IActionResult> GetCommentsOnMovie(string movieId)
        {
            var userId = User.GetUserId();
            if (userId == null)
            {
                return BadRequest(new {message = "User is not authenticated"});
            }

            var comments = await _service.AllCommentsForMovie(movieId);
            var movieComments = _mapper.Map<ICollection<Comment>, List<CommentGetOnMovieDto>>(comments);
            return Ok(movieComments);
        }

        [HttpPost("movie/{movieId}")]
        public async Task<IActionResult> PostCommentOnMovie(string movieId, [FromBody] CommentCreateDto dto)
        {   
            var userId = User.GetUserId();
            if (userId == null)
            {
                return BadRequest(new {message = "User is not authenticated"});
            }

            if (movieId == null)
            {
                return NotFound("Movie not found");
            }
            
            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            var comment = _mapper.Map<CommentCreateDto, Comment>(dto);
            
            comment.MovieId = movieId;
            comment.UserId = userId;
            
            await _service.CreateComment(comment);

            return Ok(new {message = "Comment successfully posted"});
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCommentsByUser(string userId)
        {
            var comments = await _service.AllCommentsByUser(userId);
            var movieComments = _mapper.Map<ICollection<Comment>, List<CommentGetByUserDto>>(comments);
            return Ok(movieComments);
        }
    }
}