using System;
using AutoMapper;
using MovieTime.Web.Entities;
using MovieTime.Web.Models;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMapper _mapper;
        private readonly MovieContext _context;

        public MovieService(IMapper mapper, MovieContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public MovieDetailsViewModel GetMovieDetailsById(string id)
        {
            MovieRepository localRepository = new MovieRepository(_context);
            var movieModel = localRepository.GetMovieById(id);

            if(movieModel == null){
                var omdbRepository = new OmdbMovieRepository(_mapper);
                movieModel = omdbRepository.GetMovieById(id);
            }
            var movieDetailsVM = _mapper.Map<DbMovie, MovieDetailsViewModel>(movieModel);

            return movieDetailsVM;
        }

        public MovieDetailsViewModel GetMovieDetailsByTitle(string title)
        {
            MovieRepository localRepository = new MovieRepository(_context);
            var movieModel = localRepository.GetMovieByTitle(title);

            if (movieModel == null)
            {
                var omdbRepository = new OmdbMovieRepository(_mapper);
                movieModel = omdbRepository.GetMovieById(title);
            }
            var movieDetailsVM = _mapper.Map<DbMovie, MovieDetailsViewModel>(movieModel); //todo test null

            return movieDetailsVM;
        }

        public SearchResultsModel GetMoviesByTitle(string title)
        {
            throw new NotImplementedException();
        }
    }
}
