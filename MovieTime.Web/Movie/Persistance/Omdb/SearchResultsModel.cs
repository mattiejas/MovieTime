using System.Collections.Generic;
using Newtonsoft.Json;

namespace MovieTime.Web.Movie.Persistance.Omdb
{
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