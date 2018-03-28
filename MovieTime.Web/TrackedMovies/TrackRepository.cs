using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using MovieTime.Web.TrackedMovies.Models;
using Serilog;

namespace MovieTime.Web.TrackedMovies
{
    public class TrackRepository : GenericRepository<TrackedMovie>, ITrackRepository
    {
        public TrackRepository(MovieContext context) : base(context)
        {
            
        }

        public async Task<TrackedMovie> Update(TrackedMovie trackedMovie)
        {
            var exists = await _context.Set<TrackedMovie>().AnyAsync(t => t.MovieId == trackedMovie.MovieId && t.UserId == trackedMovie.UserId);
            if (exists)
            {
                _context.Update(trackedMovie);
                await _context.SaveChangesAsync();
                return trackedMovie;
            }
            return null;
        }

        public override async Task<ICollection<TrackedMovie>> FindAll(Expression<Func<TrackedMovie, bool>> match)
        {
            return await GetDbSet().Include(t => t.User).Include(t => t.Movie).ToListAsync();
        }
    }
}