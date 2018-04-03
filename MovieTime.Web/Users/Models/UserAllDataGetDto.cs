using System.Collections.Generic;

namespace MovieTime.Web.Users.Models
{
    public class UserAllDataGetDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<string> Ratings { get; set; }
        public ICollection<string> TrackedMovies { get; set; }
        public ICollection<string> WatchedMovies { get; set; }
        public ICollection<string> Comments { get; set; }
    }
}