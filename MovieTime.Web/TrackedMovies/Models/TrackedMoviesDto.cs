using System;
using MovieTime.Web.Movies.Models;
using System.Collections;
namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMoviesDto
    {
        public string Title { get; set; }
        public DateTime Year { get; set; }
        public string Length { get; set; }
        public string Poster { get; set; }
        public bool Watched { get; set; } 
    }
}
