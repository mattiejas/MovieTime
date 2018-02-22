using System.Collections.Generic;
using Newtonsoft.Json;

namespace MovieTime.Web.Models
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

    public class SearchResultsModel
    {
        [JsonProperty("Search")]
        public List<ShortMovieModel> Movies { get; set; }
        [JsonProperty("totalResults")]
        public int TotalResults { get; set; }
        [JsonProperty("Response")]
        public bool ResultsFound { get; set; }
    }
}