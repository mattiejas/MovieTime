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
        [HttpGet("search/{title}")]
        public SearchResultsModel GetMovies(string title) => MovieService.GetMoviesByTitle(title);

        [HttpGet("{id}")]
        public MovieModel Get(string id) => MovieService.GetMovieById(id);

        [HttpGet("title/{title}")]
        public MovieModel GetByTitle(string title) => MovieService.GetMovieByTitle(title);
    }
}