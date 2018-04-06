using System.ComponentModel.DataAnnotations;

namespace MovieTime.Web.Comments.Models
{
    public class CommentManipulationDto
    {
        [Required(ErrorMessage = "Insert a comment.")]
        [MaxLength(2000, ErrorMessage = "The comment can not be longer than 2000 characters.")]
        public string Value { get; set; }
    }
}