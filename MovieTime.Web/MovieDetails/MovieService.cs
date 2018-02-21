using RestSharp;

namespace MovieTime.Web.MovieDetails
{
    public class MovieService
    {
        private static readonly string BASE_URL = "http://www.omdbapi.com";
        private static readonly string API_KEY_ARG = "apikey";
        private static readonly string API_KEY = "";
        private static readonly string MOVIE_ARG = "t";

        public static void MovieDetailService(int id)
        {
            var client = new RestClient(BASE_URL);
            var request = new RestRequest("", Method.GET);
            request.AddParameter(API_KEY_ARG, API_KEY);
            
//                var request = new RestRequest("resource/123/?name=ring", Method.POST);
//            request.AddParameter("name", "value"); // adds to POST or URL querystring based on Method
//            request.AddUrlSegment("id", "123"); // replaces matching token in request.Resource
//            request.

        }
    }
}