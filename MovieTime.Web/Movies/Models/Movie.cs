using MovieTime.Web.Genres;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieTime.Web.Movies.Models
{
    public class Movie
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [MinLength(1), MaxLength(40)]
        public string Title { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime Year { get; set; }

        [Required]
        [Range(0.0, 10.0)]
        public double Rating { get; set; }

        [Required]
        public string Rated { get; set; }

        [Required]
        public ICollection<MovieGenre> Genres { get; set; }

        [Required]
        public string Poster { get; set; }

        [Required]
        [MinLength(1), MaxLength(1440)]
        public int RunTimeInMinutes { get; set; }

        [Required]
        [MaxLength(200)]
        public string Director { get; set; }

        [Required]
        [MaxLength(200)]
        public string Writer { get; set; }

        [Required]
        [MaxLength(200)]
        public string Actors { get; set; }

        [Required]
        [MaxLength(600)]
        public string Plot { get; set; }
    }
}
