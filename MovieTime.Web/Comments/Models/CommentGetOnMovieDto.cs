using System;
using MovieTime.Web.Users;

namespace MovieTime.Web.Comments
{
    public class CommentGetOnMovieDto
    {
        public User User { get; set; }
        public string Value { get; set; }
        public DateTime Date { get; set; }
    }
}