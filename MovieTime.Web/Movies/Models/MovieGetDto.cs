using System.Collections.Generic;
using MovieTime.Web.Genres;
using MovieTime.Web.Genres.Models;

namespace MovieTime.Web.Movies.Models
{
    public class MovieGetDto
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string ImdbRating { get; set; }
        public string Poster { get; set; }
        public int RunTime { get; set; }
        public ICollection<string> Genres { get; set; }
        public string Director { get; set; }
        public string Writer { get; set; }
        public string Actors { get; set; }
        public string Plot { get; set; }
        public string ImdbId { get; set; }
    }
}