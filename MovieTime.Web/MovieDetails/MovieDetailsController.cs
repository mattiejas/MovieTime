using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MovieTime.Web.Services;

namespace MovieTime.Web.MovieDetails
{
    [Route("api/moviedetails")]
    public class MovieDetailsController : Controller
    {
        private readonly IMovieService _movieService;
        private readonly IMapper _mapper;

        public MovieDetailsController(IMovieService service, IMapper mapper)
        {
            _movieService = service;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMovieDetails")]
        public IActionResult GetMovieDetails(string id)
        {
            var movie = _movieService.GetMovieDetailsById(id);

            if (movie == null) return NotFound();

            var movieDto = _mapper.Map<MovieDetailDto>(movie);

            return Ok(movieDto);
        }

        //[HttpGet]
        //public IActionResult GetMovieByTitle(string title)
        //{
        //    var movie = _movieRepository.GetDatabaseMovieByTitle(title);

        //    if (movie == null) return NotFound();

        //    var movieDto = _mapper.Map<MovieDetailDto>(movie);

        //    return Ok(movieDto);
        //}

        [HttpPost]
        public IActionResult CreateMovie([FromBody] MovieForCreationDto movie)
        {
            if (movie == null) return BadRequest();

            // var movieEntity = _mapper.Map<DbMovie>(movie);
            _movieService.AddMovie(movie);
            // bool success = _movieRepository.SaveChanges();

            // if (!success) throw new Exception("Creating an author failed on save.");

            var movieToReturn = _mapper.Map<MovieForCreationDto, MovieDetailDto>(movie);
            var routeName = "GetMovieDetails";
            var idParam = new { id = movieToReturn.Id };

            return CreatedAtRoute(routeName, idParam, movieToReturn);
        }
    }
}