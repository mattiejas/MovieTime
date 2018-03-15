using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace MovieTime.Web.Track
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
        public async Task<IActionResult> TrackMovie([FromBody] TrackModel model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "UserId or MovieId is missing." });
            }
            try
            {
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
        public async Task<IActionResult> UntrackMovie([FromBody] TrackModel model)
        {
            if (model == null)
            {
                return BadRequest(new { message = "UserId or MovieId is missing." });
            }
            try
            {
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
                TrackedMoviesDTO models = await _trackService.GetTrackedMoviesByUserId(userId);
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
        public async Task<IActionResult> IsMovieTrackedByUser(string userId, string movieId)
        {
            try
            {
                var result = await _trackService.IsMovieTrackedByUser(userId, movieId);
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