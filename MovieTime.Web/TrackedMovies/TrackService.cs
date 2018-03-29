using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MovieTime.Web.TrackedMovies.Models;
using MovieTime.Web.Users;
using MovieTime.Web.Movies;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MovieTime.Web.TrackedMovies
{
    public class TrackService : ITrackService
    {
        private readonly ITrackRepository _trackRepository;
        
        public TrackService(ITrackRepository trackRepository)
        {
            _trackRepository = trackRepository;
        }

        public async Task<bool> TrackMovie(TrackedMovie model)
        {
            var result = await _trackRepository.Add(model);
            return result;
        }

        public async Task<bool> UntrackMovie(TrackedMovie model)
        {
            var result = await _trackRepository.Delete(model);
            return result > 0;
        }

        public async Task<TrackedMovie> IsMovieTrackedByUser(string userId, string movieId)
        {
            return await _trackRepository.Find(t => t.UserId == userId && t.MovieId == movieId);
        }

        public async Task<ICollection<TrackedMovie>> GetTrackedMoviesByUser(string userId)
        {
            return await _trackRepository.FindBy(t => t.UserId == userId)
                .Include(t => t.User)
                .Include(t => t.Movie)                                         
                .OrderByDescending(t => t.CreatedTime)
                .ToListAsync();
        }

        public async Task<TrackedMovie> ToggleMovieWatchedStatus(string movieId, string userId)
        {
            TrackedMovie track = await _trackRepository.Find(t => t.MovieId == movieId && t.UserId == userId);

            if (track == null) 
            {
                return null;
            }
            track.Watched = !track.Watched;

            var result = await _trackRepository.Update(track);
            return result;
        }
    }
}