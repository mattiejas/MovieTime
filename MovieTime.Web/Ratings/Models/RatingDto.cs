namespace MovieTime.Web.Ratings.Models
{
    public class RatingCreateDto
    {
        public string MovieId { get; set; }
        public string UserId { get; set; }
        public int Value { get; set; }
    }

    public class RatingGetDto
    {
        public string MovieId { get; set; }
        public string UserId { get; set; }
    }
}