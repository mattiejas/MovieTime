using System;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Reviews
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