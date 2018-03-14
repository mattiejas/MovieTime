using System;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Movie.Review
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        
        public string MovieId { get; set; }
        
        public DateTime AddedDateTime { get; set; }
        
        public DateTime EditedDateTime { get; set; }
    }
}