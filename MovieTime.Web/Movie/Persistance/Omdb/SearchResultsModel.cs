using System.Collections.Generic;
using MovieTime.Web.Movie.Persistance.Omdb;
using Newtonsoft.Json;

namespace MovieTime.Web.Models
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