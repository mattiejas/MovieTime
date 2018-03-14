using System;
using System.Collections.Generic;
using System.Linq;
using MovieTime.Web.Movie.Persistance;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
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
            return _context.Movies.FirstOrDefault(x => x.Id.ToLower() == movieId.ToLower());
        }

        public DbMovie GetMovieByTitle(string title)
        {
            return _context.Movies.FirstOrDefault(x => x.Title.ToLower() == title.ToLower());
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

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}