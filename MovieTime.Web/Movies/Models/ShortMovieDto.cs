namespace MovieTime.Web.Movies.Models
{
    public class ShortMovieDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
        public string Genre { get; set; }
        public string Rating { get; set; }
        public int RunTimeInMinutes { get; set; }
    }
}