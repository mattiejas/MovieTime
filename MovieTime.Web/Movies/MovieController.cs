using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieTime.Web.Movies
{
        [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly IMovieService _movieService;
        
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }
        
        [HttpGet("search/{title}")]
        public SearchResultsModel GetMovies(string title) => _movieService.GetMoviesByTitle(title);

        [HttpGet("{id}")]
        public MovieDetailsDto GetById(string id) => _movieService.GetMovieDetailsById(id);

        [HttpGet("title/{title}")]
        public MovieDetailsDto GetByTitle(string title) => _movieService.GetMovieDetailsByTitle(title);
    }
}