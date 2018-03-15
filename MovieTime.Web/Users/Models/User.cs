using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieTime.Web.Users
{
    public class User
    {
        public Guid Id { get; set; }
        
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
    }
}