using MovieTime.Web.Utilities;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieTime.Web.ThirdPartyServices
{
    public class OmdbRestClientService
    {
        private static readonly string BASE_URL = "http://www.omdbapi.com";
        private static readonly string API_KEY_ARG = "apikey";
        private static readonly string API_KEY_VAL = "90331463";

        private static readonly string MOVIE_ID_ARG = "i";
        private static readonly string MOVIE_TITLE_ARG = "t";
        private static readonly string MOVIE_SEARCH_ARG = "s";
        private static readonly string MOVIE_SEARCH_PAGE_ARG = "page";
        private static readonly string TYPE_ARG = "type";
        private readonly string MOVIE_PLOT_ARG = "plot";

        public OmdbRestClientService()
        {

        }

        public RestClient CreateClient()
        {
           var client = new RestClient(BASE_URL);

            client.AddHandler("application/json", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("text/json", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("text/x-json", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("text/javascript", Serialization.NewtonsoftJsonSerializer.Default);
            client.AddHandler("*+json", Serialization.NewtonsoftJsonSerializer.Default);

            return client;
        }


        public RestRequest CreateMovieRequest(string id, string title=null)
        {
            var request = CreateGenericMovieRequest();

            AddIdOrTitleParameter(request, id, title);
            request.AddParameter(MOVIE_PLOT_ARG, "full");

            return request;
        }

        public RestRequest CreateMoviesRequest(string title, int page=1)
        {
            var request = CreateGenericMovieRequest();

            request.AddParameter(MOVIE_SEARCH_ARG, title);
            request.AddParameter(MOVIE_SEARCH_PAGE_ARG, page);

            return request;
        }

        private void AddIdOrTitleParameter(RestRequest request, string id, string title)
        {
           var req=  string.IsNullOrEmpty(id) ? request.AddParameter(MOVIE_TITLE_ARG, title) : request.AddParameter(MOVIE_ID_ARG, id);
        }

        private RestRequest CreateGenericMovieRequest()
        {
            var request = new RestRequest("", Method.GET);

            request.AddParameter(TYPE_ARG, "movie");
            request.AddParameter(API_KEY_ARG, API_KEY_VAL);
            request.RequestFormat = DataFormat.Json;
            request.JsonSerializer = Serialization.NewtonsoftJsonSerializer.Default;
            return request;
        }
    }
}
