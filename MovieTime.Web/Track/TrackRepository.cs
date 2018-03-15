using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace MovieTime.Web.Track
{
    public interface ITrackRepository
    {
        Task<bool> TrackMovie(TrackModel model);
        Task<bool> UntrackMovie(TrackModel model);
        Task<ICollection<TrackModel>> GetTrackedMoviesByUserId(string userId);
        Task<bool> IsMovieTrackedByUser(string userId, string movieId);
    }
    
    public class TrackRepository : ITrackRepository
    {
        private readonly TrackContext _context;

        public TrackRepository(TrackContext context)
        {
            _context = context;
        }
        
        public async Task<bool> TrackMovie(TrackModel model)
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

        public async Task<bool> UntrackMovie(TrackModel model)
        {
            _context.Remove(model);
            return await _context.SaveChangesAsync() > 0;   
        }

        public async Task<ICollection<TrackModel>> GetTrackedMoviesByUserId(string userId) => 
            await _context.Tracks.Where(t => t.UserId == userId).ToListAsync();

        public async Task<bool> IsMovieTrackedByUser(string userId, string movieId)
        {
            var result = await _context.Tracks.AnyAsync(t => t.UserId == userId && t.MovieId == movieId);
            var result2 = _context.Tracks.ToList();
            return result;
        }
    }
}