using System;
namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMovieCreateDto
    {
        public string UserId { get; set; }
        public string MovieId { get; set; }
        public bool Watched { get; set; }
    }
}
