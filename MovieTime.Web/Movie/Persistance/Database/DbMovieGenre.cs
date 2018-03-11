namespace MovieTime.Web.Movie.Persistance.Database
{
    public class DbMovieGenre
    {
        public string DbMovieId { get; set; }
        public DbMovie Movie { get; set; }

        public string DbGenreId { get; set; }
        public DbGenre Genre { get; set; }
    }
}