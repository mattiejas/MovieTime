using System;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

namespace MovieTime.Web.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IThirdPartyMovieRepository _thirdPartyMovieRepository;
        private readonly IMovieRespository _movieRespository;

        public MovieService(IThirdPartyMovieRepository thirdPartyMovieRepository, IMovieRespository databaseMovieRespository)
        {
            _thirdPartyMovieRepository = thirdPartyMovieRepository;
            _movieRespository = databaseMovieRespository;
        }

        /**
         * Get the movie with the given id.
         * The business rule is to give internal database higher priority than third party databases.
         * If the movie doesn't exist in internal database, get it from third party database.
         */
        public async Task<Movie> GetMovieById(string id)
        {
            var movieModel = await _movieRespository.Find(x => x.Id == id);
            if (movieModel != null) return movieModel;

             movieModel = await _thirdPartyMovieRepository.GetMovieById(id);
            await AddMovie(movieModel); // Cache the movie in our database to improve robustness. Todo: temporary

            return movieModel;
        }

        public async Task<Movie> GetMovieByTitle(string title)
        {
            var movieModel = await _movieRespository.Find(x => x.Title == title);

            if (movieModel != null) return movieModel;
            
            movieModel = await _thirdPartyMovieRepository.GetMovieByTitle(title);
            await AddMovie(movieModel); // Cache the movie in our database to improve robustness. Todo: temporary

            return movieModel;
        }

        public Task<SearchResultsModel> GetMoviesByTitle(string title)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddMovie(Movie movie)
        {
            var createdMovie = await _movieRespository.Add(movie);
            return createdMovie != null;
        }

        public async Task<bool> MovieExist(string movieId)
        {
            var countMatch = await _movieRespository.CountMatch(x => x.Id == movieId);
            return countMatch > 0;
        }
    }
}