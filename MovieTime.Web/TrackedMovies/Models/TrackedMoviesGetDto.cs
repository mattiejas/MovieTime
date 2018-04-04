using System;
using MovieTime.Web.Movies.Models;
using System.Collections;
namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMoviesGetDto
    {
        public string Title { get; set; }
        public DateTime Year { get; set; }
        public int RunTime { get; set; }
        public string Poster { get; set; }
        public bool Watched { get; set; } 
        public DateTime CreatedTime { get; set; }
    }
}
