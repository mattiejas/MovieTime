namespace MovieTime.Web.Movie.Review
{
    public class UserReview
    {
        public string UserId { get; set; }
//        public User User { get; set; }

        public int ReviewId { get; set; }
        public Review Review { get; set; }
    }
}