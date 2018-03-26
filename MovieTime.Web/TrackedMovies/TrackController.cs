using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Auth;
using MovieTime.Web.TrackedMovies.Models;
using Serilog;

namespace MovieTime.Web.TrackedMovies
{
    [Route("api")]
    public class TrackController : Controller
    {
        private readonly ITrackService _trackService;

        public TrackController(ITrackService trackService)
        {
            _trackService = trackService;
        }
        
        [HttpPost("tracks/movie/{movieId}")]
        public async Task<IActionResult> TrackMovie(string movieId)
        {
            try
            {
                if (movieId == null)
                {
                    return BadRequest(new { message = "Identity of the movie is missing" });
                }
                
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                {
                    return BadRequest(new { message = "User is not authenticated" });
                }

                await _trackService.TrackMovie(new TrackedMovie { MovieId = movieId, UserId = userIdFromToken });
                
                return NoContent();      
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
        }

        [HttpGet("tracked/movie/{movieId}")]
        public async Task<IActionResult> IsMovieTrackedByUser(string movieId)
        {
            try
            {
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                {
                    return BadRequest(new { message = "User is not authenticated" });
                }

                var result = await _trackService.IsMovieTrackedByUser(userIdFromToken, movieId);
                return Ok(new { isTracked = result });
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });                
            }
        }

        [HttpPost("untrack/movie/{movieId}")]
        public async Task<IActionResult> UntrackMovie(string movieId)
        {         
            try
            {
                if (movieId == null)
                {
                    return BadRequest(new { message = "Identity of the movie is missing" });
                }
                
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                {
                    return BadRequest(new { message = "User is not authenticated" });
                }

                await _trackService.UntrackMovie(new TrackedMovie { MovieId = movieId, UserId = userIdFromToken }); 
                return Ok();
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
        }  
    }
}