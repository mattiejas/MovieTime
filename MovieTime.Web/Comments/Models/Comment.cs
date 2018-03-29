using System;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Comments
{
    public class Comment
    {
        public string CommentId { get; set; }
        public string Value { get; set; }
        public DateTime Date { get; set; }

        public Movie Movie { get; set; }
        public string MovieId { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
    }
}
