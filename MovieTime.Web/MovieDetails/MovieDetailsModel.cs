using System;
using Microsoft.AspNetCore.Server.Kestrel.Internal.System.Collections.Sequences;

namespace MovieTime.Web.MovieDetails
{
    public class MovieDetailsModel
    {
        private ArrayList<Actor> actors;
        private ArrayList<Genre> genres;

        public string Title { get; set; }
        public string AverageRating { get; set; }
        public string ImageUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Summary { get; set; }
        public int DurationInMinutes { get; set; }
        
        public MovieDetailsModel(String title)
        {
            
        }
    }
}