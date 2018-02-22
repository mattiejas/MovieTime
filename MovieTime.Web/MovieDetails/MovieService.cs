using System;
using System.Collections.Generic;
using Microsoft.IdentityModel.Protocols;
using MovieTime.Web.Models;
using RestSharp;

namespace MovieTime.Web.MovieDetails
{
    public interface IMovieService
    {
        OmdbMovieModel GetMovieById(string id);
        OmdbMovieModel GetMovieByTitle(string title);
        SearchResultsModel GetMoviesByTitle(string title);
    }
    
    public class MovieService : IMovieService
    {
        private static readonly string BASE_URL = "http://www.omdbapi.com";
        private static readonly string API_KEY_ARG = "apikey";
        private static readonly string API_KEY_VAL = "90331463";

        private static readonly string MOVIE_ID_ARG = "i";
        private static readonly string MOVIE_TITLE_ARG = "t";
        private static readonly string MOVIE_SEARCH_ARG = "s";
        private static readonly string TYPE_ARG = "type";


        public OmdbMovieModel GetMovieById(string id)
        {
            var client = CreateClient();
            var request = CreateRequest("", Method.GET);
            
            request.AddParameter(MOVIE_ID_ARG, id);

            var response = client.Execute<OmdbMovieModel>(request);
            if (response.Data == null) throw new Exception("Empty response");
            
            return response.Data;
        }

        public OmdbMovieModel GetMovieByTitle(string title)
        {
            var client = CreateClient();
            var request = CreateRequest("", Method.GET);
            
            request.AddParameter(MOVIE_TITLE_ARG, title);

            var response = client.Execute<OmdbMovieModel>(request);
            if (response.Data == null) throw new Exception("Empty response");
            
            return response.Data;
        }
        
        public SearchResultsModel GetMoviesByTitle(string title)
        {
            var client = CreateClient();
            var request = CreateRequest("", Method.GET);
            
            request.AddParameter(MOVIE_SEARCH_ARG, title);
            
            var response = client.Execute<SearchResultsModel>(request);
            if (response.Data == null) throw new Exception("Empty response");
            
            return response.Data;
        }

        /// <summary>
        /// Generic CreateRequest method, configured with shared information and the correct serialization.
        /// </summary>
        /// <param name="resource"></param>
        /// <param name="method"></param>
        /// <returns></returns>
        private static RestRequest CreateRequest(string resource, RestSharp.Method method)
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
        private static RestClient CreateClient()
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