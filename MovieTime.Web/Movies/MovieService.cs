using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using Serilog;

namespace MovieTime.Web.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IThirdPartyMovieRepository _thirdPartyMovieRepository;
        private readonly IMovieRespository _movieRespository;
        private readonly IMapper _mapper;

        public MovieService(IThirdPartyMovieRepository thirdPartyMovieRepository,
            IMovieRespository databaseMovieRespository, IMapper mapper)
        {
            _thirdPartyMovieRepository = thirdPartyMovieRepository;
            _movieRespository = databaseMovieRespository;
            _mapper = mapper;
        }

        /**
         * Get the movie with the given id.
         * The business rule is to give internal database higher priority than third party databases.
         * If the movie doesn't exist in internal database, get it from third party database.
         */
        public async Task<Movie> GetMovieById(string id, bool save = true)
        {
            var movieModel = await _movieRespository.Find(x => x.Id == id);
            if (movieModel != null) return movieModel;

            movieModel = await _thirdPartyMovieRepository.GetMovieById(id);
            await AddMovie(movieModel, save); // Cache the movie in our database to improve robustness. Todo: temporary

            return movieModel;
        }

        public async Task<Movie> GetMovieByTitle(string title)
        {
            var movieModel = await _movieRespository.Find(x => x.Title.ToLower() == title.ToLower());

            if (movieModel != null) return movieModel;

            movieModel = await _thirdPartyMovieRepository.GetMovieByTitle(title);
            await AddMovie(movieModel); // Cache the movie in our database to improve robustness. Todo: temporary

            return movieModel;
        }

        private async Task<ShortMovieDto> FillShortMovieDto(ShortMovieDto shortMovie)
        {
            var movie = await GetMovieById(shortMovie.Id, false);
            shortMovie.RunTimeInMinutes = movie.RunTimeInMinutes > 0 ? movie.RunTimeInMinutes : 90;
            shortMovie.Rating = "5.0";
            shortMovie.Genre = "Action";
            return shortMovie;
        }
        
        public async Task<List<ShortMovieDto>> GetMoviesByTitle(string title, int page = 1)
        {
            var searchResultsModel = await _thirdPartyMovieRepository.GetMoviesByTitle(title, page);
            var shortMovieDtos = _mapper.Map<List<ShortMovieModel>, List<ShortMovieDto>>(searchResultsModel.Movies);

            await shortMovieDtos.ToAsyncEnumerable()
                .ForEachAsync(async shortMovie => await FillShortMovieDto(shortMovie));
            
            await _movieRespository.Save();

            return shortMovieDtos;
        }

        public async Task<bool> AddMovie(Movie movie, bool save = true)
        {
            var createdMovie = await _movieRespository.Add(movie, save);
            return createdMovie != null;
        }

        public async Task<bool> MovieExistById(string movieId)
        {
            var countMatch = await _movieRespository.CountMatch(x => x.Id == movieId);
            return countMatch > 0;
        }
    }
}