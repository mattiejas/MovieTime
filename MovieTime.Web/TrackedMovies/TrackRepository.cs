using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using MovieTime.Web.Tracked.Models;
using Serilog;

namespace MovieTime.Web.TrackedMovies
{
    public interface ITrackRepository
    {
        Task<bool> TrackMovie(TrackedMovie model);
        Task<bool> UntrackMovie(TrackedMovie model);
        Task<ICollection<TrackedMovie>> GetTrackedMoviesByUserId(string userId);
        Task<bool> IsMovieTrackedByUser(string userId, string movieId);
    }
    
    public class TrackRepository : GenericRepository<TrackedMovie>, ITrackRepository
    {
        public TrackRepository(MovieContext context) : base(context)
        {
        }
        
        public async Task<bool> TrackMovie(TrackedMovie model)
        {
            try
            {
                _context.Add(model);
                return await _context.SaveChangesAsync() > 0;   
            }
            catch (DbUpdateException err)
            {
                // TODO: Check if the exception is a duplicate key error
                throw new Exception(string.Format("User {0} is already tracking movie {1}.", model.UserId, model.MovieId));
            }            
        }

        public async Task<bool> UntrackMovie(TrackedMovie model)
        {
            _context.Remove(model);
            return await _context.SaveChangesAsync() > 0;   
        }

        public async Task<ICollection<TrackedMovie>> GetTrackedMoviesByUserId(string userId) => 
            await _context.TrackedMovies.Where(t => t.UserId == userId).ToListAsync();

        public async Task<bool> IsMovieTrackedByUser(string userId, string movieId)
        {
            var result = await _context.TrackedMovies.AnyAsync(t => t.UserId == userId && t.MovieId == movieId);
            var result2 = _context.TrackedMovies.ToList();
            return result;
        }
    }
}