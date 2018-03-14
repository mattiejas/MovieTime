using System;
using System.Collections.Generic;

namespace MovieTime.Web.Movie.Persistance.Database
{
    public class MovieDetailDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public ICollection<GenreDto> Genres { get; set; }
    }
}
