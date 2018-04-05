using System;
using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Movies.Models
{
    public abstract class MovieManipulationDto
    {
        [Required(ErrorMessage = "You should fill out a title.")]
        [MaxLength(2000, ErrorMessage = "The title shouldn't have more than 2000 characters.")]
        public string Title { get; set; }
        
        [Required(ErrorMessage = "You .")]
        [DataType(DataType.DateTime, ErrorMessage = "Incorrect date format")]
        public DateTime Year { get; set; }
        
        [Required(ErrorMessage = "You should fill out a Rate value")]
        [MaxLength(ErrorMessage = "The rated value needs to be between 0 and 10")]
        public string Rated { get; set; }
        
        public string Poster { get; set; }
        
        [Required(ErrorMessage = "You should fill out a runtime value")]
        [Range(1, 1000, ErrorMessage = "The runtime should be between 1 and 1000 minutes")]
        public int RunTimeInMinutes { get; set; }
        
        [Required(ErrorMessage = "You should fill out the writer(s)")]
        [MaxLength(2000, ErrorMessage = "The length of Writer should not be longer than 2000 characters")]
        public string Writer { get; set; }
        
        [Required(ErrorMessage = "You should fill out the director(s)")]
        [MaxLength(2000, ErrorMessage = "The length of Director should not be longer than 2000 characters")]
        public string Director { get; set; }
        
        [Required(ErrorMessage = "You should fill out a Rate value")]
        [MaxLength(2000, ErrorMessage = "The length of Actor should not be longer than 2000 characters")]
        public string Actors { get; set; }
        
        [Required(ErrorMessage = "You should fill out plot")]
        [MaxLength(4000, ErrorMessage = "The length of Plot should not be longer than 4000 characters")]
        public string Plot { get; set; }
    }
}