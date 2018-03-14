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
    }
}