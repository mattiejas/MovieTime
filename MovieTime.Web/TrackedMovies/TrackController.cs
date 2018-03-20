using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Auth;
using MovieTime.Web.Tracked.Models;
using Serilog;

namespace MovieTime.Web.TrackedMovies
{
    public class TrackController : Controller
    {
        private readonly ITrackService _trackService;

        public TrackController(ITrackService trackService)
        {
            _trackService = trackService;
        }
        
        [HttpPost]
        [Route("api/[controller]")]
        public async Task<IActionResult> TrackMovie([FromBody] TrackedMovie model)
        {
            try
            {
                if (model == null)
                    return BadRequest(new { message = "Identity of the movie is missing" });
                
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                    return BadRequest(new { message = "User is not authenticated" });

                model.UserId = userIdFromToken;
                await _trackService.TrackMovie(model);
                
                return NoContent();      
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
        }     
        
        [HttpPost]
        [Route("api/[controller]/untrack")]
        public async Task<IActionResult> UntrackMovie([FromBody] TrackedMovie model)
        {         
            try
            {
                if (model == null)
                    return BadRequest(new { message = "Identity of the movie is missing" });
                
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                    return BadRequest(new { message = "User is not authenticated" });

                model.UserId = userIdFromToken;
                await _trackService.UntrackMovie(model); 
                return Ok();
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
        }        

        [HttpGet]
        [Route("api/[controller]/{userId}")]
        public async Task<IActionResult> GetTrackedMoviesByUserId(string userId)
        {
            try
            {
                TrackedMoviesDto models = await _trackService.GetTrackedMoviesByUserId(userId);
                return Ok();
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });                
            }
        }
        
        [HttpGet]
        [Route("api/[controller]/user/{userId}/movie/{movieId}")]
        public async Task<IActionResult> IsMovieTrackedByUser(string movieId)
        {
            try
            {
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                    return BadRequest(new { message = "User is not authenticated" });

                var result = await _trackService.IsMovieTrackedByUser(userIdFromToken, movieId);
                return Ok(new { isTracked = result });
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });                
            }
        }        
    }
}