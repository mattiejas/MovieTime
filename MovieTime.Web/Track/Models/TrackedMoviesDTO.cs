using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MovieTime.Web.Track
{
    public class TrackedMoviesDTO
    {
        public string userId { get; set; }        
        public ICollection<string> movieIds { get; set; }
    }
}