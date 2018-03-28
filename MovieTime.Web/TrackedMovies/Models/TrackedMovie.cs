using System;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMovie
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string MovieId { get; set; }
        public Movie Movie { get; set; }

        public bool Watched { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
