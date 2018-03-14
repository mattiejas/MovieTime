using Newtonsoft.Json;

namespace MovieTime.Web.ThirdPartyServices.OMDB.MovieList
{
    public class ShortMovieModel
    {
        public string Title { get; set; }
        public string Year { get; set; }
        [JsonProperty("imdbID")]
        public string ImdbId { get; set; }
        public string Type { get; set; }
        public string Poster { get; set; }
    }
}