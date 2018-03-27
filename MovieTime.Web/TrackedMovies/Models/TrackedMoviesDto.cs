using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace MovieTime.Web.TrackedMovies.Models
{
    public class TrackedMoviesDto
    {
        public string userId { get; set; }        
        public ICollection<string> movieIds { get; set; }
    }
}