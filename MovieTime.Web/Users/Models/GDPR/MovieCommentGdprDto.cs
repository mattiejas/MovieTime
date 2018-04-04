using System;

namespace MovieTime.Web.Users.Models.GDPR
{
    public class MovieCommentGdprDto
    {
        public string CommentId { get; set; }
        public string Value { get; set; }
        public DateTime Date { get; set; }
        public string MovieId { get; set; }
        public string MovieTitle { get; set; }
    }
}