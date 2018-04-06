using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.Utilities;
using RestSharp;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;

namespace MovieTime.Web.ThirdPartyServices.OMDB.Movies
{
    public class OmdbMovieRepository : IThirdPartyMovieRepository
    {
        private readonly IMapper _mapper;
        private readonly OmdbRestClientService _clientService;
        private readonly RestClient _client;

        public OmdbMovieRepository(IMapper mapper)
        {
            _mapper = mapper;
            _clientService = new OmdbRestClientService() ;
            _client = _clientService.CreateClient();
        }

        public async Task<Movie> GetMovieById(string id)
        {
            if (string.IsNullOrEmpty(id)) throw new ArgumentNullException("A valid Id is needed");
            var request = _clientService.CreateMovieRequest(id);
            var response = await _client.ExecuteTaskAsync<OmdbMovieModel>(request);
            if (response.Data.Response=="False") throw new Exception("Empty response for MovieById request");

            var movie = _mapper.Map<OmdbMovieModel, Movie>(response.Data);
            return movie;
        }

        public async Task<Movie> GetMovieByTitle(string title)
        {
            if (string.IsNullOrEmpty(title)) throw new ArgumentNullException("A valid title is needed");    
            var request = _clientService.CreateMovieRequest(null, title);
            var response = await _client.ExecuteTaskAsync<OmdbMovieModel>(request);
            if (response.Data.Response == "False") throw new Exception("Empty response for MovieByTitle request");

            var movie = _mapper.Map<OmdbMovieModel, Movie>(response.Data);
            return movie;
        }

        public async Task<SearchResultsModel> GetMoviesByTitle(string title, int page=1)
        {
            if (string.IsNullOrEmpty(title)) throw new ArgumentNullException("A valid title is needed");
            if (page < 1 || page > 100) throw new ArgumentOutOfRangeException("GetMoviesByTitle needs a page value in the range 1-100");

            var request =  _clientService.CreateMoviesRequest(title, page);
            var response = await _client.ExecuteTaskAsync<SearchResultsModel>(request);
            if (response.Data == null) throw new Exception("Empty response for MoviesByTitle request");
            return response.Data;
        }
    }
}