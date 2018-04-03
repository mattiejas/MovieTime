using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using MovieTime.Web.TrackedMovies.Models;

namespace MovieTime.Web.Users
{
    public class User
    {
        public string Id { get; set; }
        
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }

        public ICollection<TrackedMovie> TrackedMovies { get; set; }
    }
}