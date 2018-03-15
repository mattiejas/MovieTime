using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Ratings.Models;
using Serilog;

namespace MovieTime.Web.Ratings
{
    [Route("api/ratings")]
    public class RatingController : Controller
    {
        [HttpGet]
        public Rating GetRating([FromBody] RatingGetDto data)
        {
            Log.Debug(data.MovieId, data.UserId);
            return new Rating();
        }        
        
        [HttpPost]
        public Rating CreateRating([FromBody] RatingCreateDto data)
        {
            Log.Debug(data.MovieId, data.UserId);
            return new Rating();
        }        
        
        [HttpGet("{movieId}")]
        public int GetAverageMovieRating(string movieId)
        {
            Log.Debug(movieId);
            return 4;
        }
    }
}