using System;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.Comments
{
    public class CommentGetByUserDto
    {
        public Movie Movie { get; set; }
        public string Value { get; set; }
        public DateTime Date { get; set; }
    }
}