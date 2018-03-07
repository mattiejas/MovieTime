using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Server.Kestrel.Internal.System.Collections.Sequences;

namespace MovieTime.Web.MovieDetails
{
    public class MovieDetailsViewModel
    {
        public string Title { get; set; }
        public string Year { get; set; }
        public string Rated { get; set; }
        public string Poster { get; set; }
        public string RunTime { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
        public string Writer { get; set; }
        public string Actors { get; set; }
        public string Plot { get; set; }
        public string ImdbId { get; set; }
    }
}