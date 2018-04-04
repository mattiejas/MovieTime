using System;

namespace MovieTime.Web.Comments
{
    public class CommentCreateDto
    {
        public string MovieId { get; set; }
        public string UserId { get; set; }
        public string Value { get; set; }
        public DateTime Date { get; set; }
    }
}