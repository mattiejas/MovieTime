using System;
using System.Data.SqlClient;
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
    }
}