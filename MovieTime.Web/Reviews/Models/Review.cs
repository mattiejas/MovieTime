using System;
using System.ComponentModel.DataAnnotations;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Reviews.Models
{
    public class Review
    {
        public int Id { get; set; }
        
        public Guid UserId { get; set; }
        public User User { get; set; }
        
        public string MovieId { get; set; }
        public Movie Movie { get; set; }
        
        public DateTime AddedDateTime { get; set; }
        
        public DateTime EditedDateTime { get; set; }
        
        public bool IsConcept { get; set; }
    }
}