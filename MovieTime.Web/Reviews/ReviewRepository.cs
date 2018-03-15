using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using MovieTime.Web.Reviews.Models;


namespace MovieTime.Web.Reviews
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        public ReviewRepository(MovieContext context) : base(context)
        {
        }

        // Todo: This is an example to show you when you could use respository specific method. Delete it when there are real examples.
        public async Task<Review> GetNewestReview(string movieId)
        {
            /*
             * In order to get the latest date in Review table, we call the Max() method.
             * The method, which is a DbContext specific method, can't be called outside the repository
             * because we are encapsulating the database implementation from everyone else.
             */
            var newestDate = await GetDbSet().MaxAsync(x => x.AddedDateTime);
            var newestReview = await GetDbSet().FirstOrDefaultAsync(x => x.AddedDateTime == newestDate);

            return newestReview;
        }
    }
}