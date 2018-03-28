using System;
namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMovieGetDto
    {
        public string UserId { get; set; }
        public string MovieId { get; set; }
        public bool Watched { get; set; }
    }
}
