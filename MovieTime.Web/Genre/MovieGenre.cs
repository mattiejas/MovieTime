namespace MovieTime.Web.Movie.Persistance.Database
{
    public class MovieGenre
    {
        public string DbMovieId { get; set; }
        public Movie Movie { get; set; }

        public string DbGenreId { get; set; }
        public Genre Genre { get; set; }
    }
}