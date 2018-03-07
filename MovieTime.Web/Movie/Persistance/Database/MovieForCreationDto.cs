using System;
using System.Collections.Generic;

namespace MovieTime.Web.Movie.Persistance.Database
{
    public class MovieForCreationDto
    {
        public string Title { get; set; }
        public DateTime Year { get; set; }
        public double Rated { get; set; }
        public string Poster { get; set; }
        public int RunTimeInMinutes { get; set; }
        public string Writer { get; set; }
        public string Director { get; set; }
        public string Actors { get; set; }
        public string Plot { get; set; }
        public string ImdbId { get; set; }
        public ICollection<GenreForCreationDto> Genres { get; set; }

        public MovieForCreationDto(){
            Genres = new List<GenreForCreationDto>();
        }
    }
}
