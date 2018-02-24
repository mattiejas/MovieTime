using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Models;
using RestSharp;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieTime.Web.MovieDetails
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly IMovieRepository _movieService;
        
        public MovieController(IMovieRepository movieService)
        {
            _movieService = movieService;
        }
        
        [HttpGet("search/{title}")]
        public SearchResultsModel GetMovies(string title) => _movieService.GetMoviesByTitle(title);

        [HttpGet("{id}")]
        public MovieDetailsViewModel Get(string id) => _movieService.GetMovieDetailsById(id);

        [HttpGet("title/{title}")]
        public MovieDetailsViewModel GetByTitle(string title) => _movieService.GetMovieDetailsByTitle(title);
    }
}