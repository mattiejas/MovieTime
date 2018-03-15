using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.Utilities;
using RestSharp;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.ThirdPartyServices.OMDB.Movies
{
    public class OmdbMovieRepository : IThirdPartyMovieRepository
    {
        private static readonly string BASE_URL = "http://www.omdbapi.com";
        private static readonly string API_KEY_ARG = "apikey";
        private static readonly string API_KEY_VAL = "90331463";

        private static readonly string MOVIE_ID_ARG = "i";
        private static readonly string MOVIE_TITLE_ARG = "t";
        private static readonly string MOVIE_SEARCH_ARG = "s";
        private static readonly string TYPE_ARG = "type";
        private readonly string MOVIE_PLOT_ARG = "plot";

        private readonly IMapper _mapper;

        public OmdbMovieRepository(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<Movie> GetMovieById(string id) => await GetMovieByArg(null, id);

        public async Task<Movie> GetMovieByTitle(string title) => await GetMovieByArg(title);

        private async Task<Movie> GetMovieByArg(string title, string id = null)
        {
            if (string.IsNullOrEmpty(title) && string.IsNullOrEmpty(id))
                throw new Exception("Title and Id can't both be null.");
            if (title != null && id != null) throw new Exception("Title and Id can't both be filled.");

            var client = CreateClient();
            var request = CreateRequest("", Method.GET);

            if (title != null) request.AddParameter(MOVIE_TITLE_ARG, title);
            if (id != null) request.AddParameter(MOVIE_ID_ARG, id);

            request.AddParameter(MOVIE_PLOT_ARG, "full");

            var response = await client.ExecuteTaskAsync<OmdbMovieModel>(request);
            if (response.Data == null) throw new Exception("Empty response");

            var movieModel = _mapper.Map<OmdbMovieModel, Movie>(response.Data);
            return movieModel;
        }

        public async Task<IEnumerable<Movie>> GetMoviesByTitleSearch(string title)
        {
            // var client = CreateClient();
            // var request = CreateRequest("", Method.GET);
            //
            // request.AddParameter(MOVIE_SEARCH_ARG, title);
            //
            // var response = client.Execute<SearchResultsModel>(request);
            // if (response.Data == null) throw new Exception("Empty response");
            //
            // return response.Data;
            throw new NotImplementedException();
        }

        /// <summary>
        /// Generic CreateRequest method, configured with shared information and the correct serialization.
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="method"></param>
        /// <returns></returns>
        private RestRequest CreateRequest(string resource, RestSharp.Method method)
        {
            var request = new RestRequest(resource, method);

            request.AddParameter(TYPE_ARG, "movie");
            request.AddParameter(API_KEY_ARG, API_KEY_VAL);
            request.RequestFormat = DataFormat.Json;
            request.JsonSerializer = Serialization.NewtonsoftJsonSerializer.Default;

            return request;
        }

        /// <summary>
        /// Generic CreateClient method, configured with the base url and the correct deserialization.
        /// </summary>
        /// <returns></returns>
        private RestClient CreateClient()
        {
            var client = new RestClient(BASE_URL);

            client.AddHandler("application/json", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("text/json", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("text/x-json", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("text/javascript", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("*+json", Serialization.NewtonsoftJsonSerializer.Default);

            return client;
        }
    }
}