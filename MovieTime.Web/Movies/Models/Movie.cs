using MovieTime.Web.TrackedMovies.Models;
using System;
using System.Collections.Generic;
using MovieTime.Web.Genres.Models;

namespace MovieTime.Web.Movies.Models
{
    public class Movie
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public DateTime Year { get; set; }

        public ICollection<MovieGenre> Genres { get; set; }

        public string Poster { get; set; }

        public int RunTimeInMinutes { get; set; }
        
        public string Director { get; set; }

        public string Writer { get; set; }

        public string Actors { get; set; }

        public string Plot { get; set; }
        
        //Todo: Show IMDB rating untill our own rating system is implemented
        public string ImdbRating { get; set; }

        public ICollection<TrackedMovie> TrackedMovies { get; set; }
    }
}