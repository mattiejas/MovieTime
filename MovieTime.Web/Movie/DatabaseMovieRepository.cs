using System;
using System.Collections.Generic;
using System.Linq;
using MovieTime.Web.Movie.Persistance;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
{
    public class DatabaseMovieRepository :  GenericRepository<Persistance.Database.Movie>, IDatabaseMovieRespository
    {

        public DatabaseMovieRepository(MovieContext context):base(context)
        {}

        public IEnumerable<Persistance.Database.Movie> GetMoviesByTitleSearch(string title)
        {
            throw new NotImplementedException();
        }

        public Movie GetMovieById(string movieId)
        {
            return GetDbSet().FirstOrDefault(m => m.Id== movieId);
        }

        public Movie GetMovieByTitle(string title)
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

        public void AddMovie(Persistance.Database.Movie movie)
        {
            _context.Movies.Add(movie);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}