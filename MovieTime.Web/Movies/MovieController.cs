using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Movies.Models;
using Serilog;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieTime.Web.Movies
{
    [Route("api/movie")] //todo change movie to movies
    public class MovieController : Controller
    {
        private const string GetMovieByIdRoute = "GetMovieById";
        private readonly IMovieService _movieService;
        private readonly IMapper _mapper;

        public MovieController(IMovieService movieService, IMapper mapper)
        {
            _movieService = movieService;
            _mapper = mapper;
        }

        [HttpGet("search/{title}")]
        public async Task<IActionResult> GetMovies(string title)
        {
            throw new NotImplementedException();
        }

        [HttpGet("{id}", Name = GetMovieByIdRoute)]
        public async Task<IActionResult> GetMovieById(string id)
        {
            var movie = await _movieService.GetMovieById(id);
            if (movie == null) return NotFound();

            var movieGetDto = _mapper.Map<Movie, MovieGetDto>(movie);
            
            Log.Warning("Movie posters location is " + movie.Poster);

            return Ok(movieGetDto);
        }

        [HttpGet("title/{title}")]
        public async Task<IActionResult> GetMovieByTitle(string title)
        {
            var movie = await _movieService.GetMovieByTitle(title);
            if (movie == null) return NotFound();

            var movieGetDto = _mapper.Map<Movie, MovieGetDto>(movie);

            return Ok(movieGetDto);
        }        
        
        [HttpGet("trending/{count}")]
        public async Task<IActionResult> GetTrendingMovies(int count = 4)
        {
            var movies = await _movieService.GetTrendingMovies(count);
            if (movies == null) return NotFound();

            var movieGetDto = _mapper.Map<ICollection<Movie>, ICollection<MovieGetDto>>(movies);

            return Ok(movieGetDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movieCreateDto)
        {
            if (movieCreateDto == null) return BadRequest();

            var movieExist = await _movieService.MovieExistById(movieCreateDto.ImdbId);
            if (movieExist) return new StatusCodeResult(StatusCodes.Status409Conflict);

            var movie = _mapper.Map<MovieCreateDto, Movie>(movieCreateDto);
            var success = await _movieService.AddMovie(movie);
            if (!success)
            {
                // Throw code 500 instead of 4xx when saving changes failed because it is a server side issue
                throw new Exception($"Failed to save the user to the database with the id {movie.Id}");
            }

            var movieToReturn = _mapper.Map<Movie, MovieGetDto>(movie);
            var routeValue = new {id = movie.Id};

            return CreatedAtRoute(GetMovieByIdRoute, routeValue, movieToReturn);
        }
    }
}