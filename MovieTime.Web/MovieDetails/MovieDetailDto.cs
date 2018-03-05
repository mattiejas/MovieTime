using System;
using System.Collections.Generic;
using MovieTime.Web.Genres;

namespace MovieTime.Web.MovieDetails
{
    public class MovieDetailDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public ICollection<GenreDto> Genres { get; set; }
    }
}
