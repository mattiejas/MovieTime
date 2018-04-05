using System;
using MovieTime.Web.Movies.Models;
using System.Collections;
using System.Collections.Generic;

namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMoviesGetDto
    {
        public string MovieId { get; set; }
        public string Title { get; set; }
        public DateTime Year { get; set; }
        public int RunTime { get; set; }
        public string Poster { get; set; }
        public string ImdbRating { get; set; }
        public ICollection<string> Genres { get; set; }
        public bool Watched { get; set; } 
        public DateTime CreatedTime { get; set; }
    }
}
