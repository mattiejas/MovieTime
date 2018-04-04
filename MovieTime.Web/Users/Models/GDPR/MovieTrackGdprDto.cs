using System;

namespace MovieTime.Web.Users.Models.GDPR
{
    public class MovieTrackGdprDto
    {
        public string MovieId { get; set; }
        public string MovieTitle { get; set; }
        public bool Watched { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}