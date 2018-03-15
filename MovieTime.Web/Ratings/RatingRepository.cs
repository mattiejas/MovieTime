using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Ratings.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Ratings
{
    public interface IRatingRepository
    {
    }
    
    public class RatingRepository : GenericRepository<Rating>, IRatingRepository
    {
        public RatingRepository(MovieContext context) : base(context)
        {
            
        }
    }
}