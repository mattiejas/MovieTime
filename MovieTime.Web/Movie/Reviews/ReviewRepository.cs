using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Movie.Persistance;
using MovieTime.Web.Movie.Repositories;

namespace MovieTime.Web.Movie.Review
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        public ReviewRepository(MovieContext context) : base(context)
        {
        }


        public Review GetNewestReview(string movieId)
        {
            var newestDate = GetAll().Max(x => x.AddedDateTime);
            var newestReview = GetAll()
                .FirstOrDefault(x => x.AddedDateTime == newestDate);

            return newestReview;
        }

        public async Task<Review> GetNewestReviewAsync(string movieId)
        {
            var newestDate = GetAll().Max(x => x.AddedDateTime);
            var newestReview = await GetAll()
                .FirstOrDefaultAsync(x => x.AddedDateTime == newestDate);

            return newestReview;
        }
    }
}