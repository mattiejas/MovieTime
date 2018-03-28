using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Auth;
using MovieTime.Web.TrackedMovies.Models;
using Serilog;
using System.Linq;
using System.Collections;

namespace MovieTime.Web.TrackedMovies
{
    [Route("api")]
    public class TrackController : Controller
    {
        private readonly ITrackService _trackService;
        private readonly IMapper _mapper;

        public TrackController(ITrackService trackService, IMapper mapper)
        {
            _trackService = trackService;
            _mapper = mapper;
        }

        [HttpGet("tracks/movie")]
        public async Task<IActionResult> GetAllTrackedMovies()
        {
            try
            {
                var userIdFromToken = this.User.GetUserId();
                if (userIdFromToken == null)
                {
                    return BadRequest(new { message = "User is not authenticated" });
                }

                var trackedMovies = await _trackService.GetTrackedMoviesByUser(userIdFromToken);
                var trackedMoviesDto = _mapper.Map<ICollection<TrackedMovie>, ICollection<TrackedMoviesDto>>(trackedMovies);

                return Ok(trackedMoviesDto);
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
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

                var trackedMovieDto = new TrackedMovieDto { MovieId = movieId, UserId = userIdFromToken, Watched = false };
                var trackedMovie = _mapper.Map<TrackedMovieDto, TrackedMovie>(trackedMovieDto);

                await _trackService.TrackMovie(trackedMovie);
                
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

                var trackedMovieDto = new TrackedMovieDto { MovieId = movieId, UserId = userIdFromToken };
                var trackedMovie = _mapper.Map<TrackedMovieDto, TrackedMovie>(trackedMovieDto);

                await _trackService.UntrackMovie(trackedMovie); 
                return Ok();
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
        }  

        [HttpPost("watch/movie/{movieId}")]
        public async Task<IActionResult> ToggleMovieWatchedStatus(string movieId)
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

                var result = await _trackService.ToggleMovieWatchedStatus(movieId, userIdFromToken);

                var response = _mapper.Map<TrackedMovie, TrackedMovieDto>(result);
                return Ok(response);
            }
            catch (Exception err)
            {
                Log.Error(err.Message);
                return BadRequest(new { message = err.Message });
            }
        }  
    }
}