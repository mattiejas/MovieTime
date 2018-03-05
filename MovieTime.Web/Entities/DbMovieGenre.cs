using System;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Entities
{
    public class DbMovieGenre
    {
        public Guid DbMovieId { get; set; }
        public DbMovie Movie { get; set; }

        public string DbGenreId { get; set; }
        public DbGenre Genre { get; set; }
    }
}