using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MovieTime.Web.Movies
{
    public class MovieRepository :  GenericRepository<Movie>, IMovieRespository
    {

        public MovieRepository(MovieContext context):base(context)
        {}

        public IEnumerable<Movie> GetMoviesByTitleSearch(string title)
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

        public void AddMovie(Movie movie)
        {
            _context.Movies.Add(movie);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}