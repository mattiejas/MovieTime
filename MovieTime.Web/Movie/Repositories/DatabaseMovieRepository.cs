using System;
using System.Collections.Generic;
using System.Linq;
using MovieTime.Web.Entities;
using MovieTime.Web.Services;

namespace MovieTime.Web.MovieDetails
{
    public class DatabaseMovieRepository : IDatabaseMovieRespository
    {
        private readonly MovieContext _context;

        public DatabaseMovieRepository(MovieContext context)
        {
            _context = context;
        }

        public IEnumerable<DbMovie> GetMoviesByTitleSearch(string title)
        {
            throw new NotImplementedException();
        }

        public DbMovie GetMovieById(string movieId)
        {
            return _context.Movies.FirstOrDefault(x => x.Id == movieId);
        }

        public DbMovie GetMovieByTitle(string title)
        {
            return _context.Movies.FirstOrDefault(x => x.Title == title);
        }

        public void DeleteMovieById(string id)
        {
            throw new NotImplementedException();
        }

        public void DeleteMovieByTitle(string title)
        {
            throw new NotImplementedException();
        }

        public void AddMovie(DbMovie movie)
        {
            _context.Movies.Add(movie);
        }
    }
}