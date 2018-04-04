using System.Collections.Generic;

namespace MovieTime.Web.Users.Models.GDPR
{
    public class UserAllDataGetDto
    {
        public UserGdprDto User { get; set; }
        public ICollection<MovieTrackGdprDto> TrackedMovies { get; set; }
        public ICollection<MovieCommentGdprDto> Comments { get; set; }
    }
}