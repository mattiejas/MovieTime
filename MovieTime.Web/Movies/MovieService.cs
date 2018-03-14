using System;
using AutoMapper;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

namespace MovieTime.Web.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IMapper _mapper;
        private readonly IThirdPartyMovieRepository _thirdPartyMovieRepository;
        private readonly IMovieRespository _movieRespository;

        public MovieService(IMapper mapper, IThirdPartyMovieRepository thirdPartyMovieRepository, IMovieRespository databaseMovieRespository)
        {
            _mapper = mapper;
            _thirdPartyMovieRepository = thirdPartyMovieRepository;
            _movieRespository = databaseMovieRespository;
        }

        public MovieDetailsDto GetMovieDetailsById(string id)
        {
            var movieModel = _movieRespository.GetMovieById(id);
            if (movieModel == null)
            {
                movieModel = _thirdPartyMovieRepository.GetMovieById(id);

                // Cache the movie in our database to improve robustness
                _movieRespository.AddMovie(movieModel);
                _movieRespository.Save();
            }

            var movieDetailsVm = _mapper.Map<Movie, MovieDetailsDto>(movieModel);

            return movieDetailsVm;
        }

        public MovieDetailsDto GetMovieDetailsByTitle(string title)
        {
            var movieModel = _movieRespository.GetMovieByTitle(title);

            if (movieModel == null)
            {
                movieModel = _thirdPartyMovieRepository.GetMovieByTitle(title);

                // Cache the movie in our database to improve robustness
                _movieRespository.AddMovie(movieModel);
                _movieRespository.Save();
            }

            var movieDetailsVm = _mapper.Map<Movie, MovieDetailsDto>(movieModel); //todo test null

            return movieDetailsVm;
        }

        public SearchResultsModel GetMoviesByTitle(string title)
        {
            throw new NotImplementedException();
        }

        public void AddMovie(MovieCreateDto movie)
        {
            throw new NotImplementedException();
        }
    }
}