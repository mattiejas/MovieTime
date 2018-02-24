using System;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.MovieDetails
{
    public class Genre
    {
        [Key]
        public string Name { get; set; }
        
        [Required]
        public bool CustomField { get; set; }
        
    }
}