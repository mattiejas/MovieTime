﻿using System;
using System.Collections.Generic;
using System.Linq;
using MovieTime.Web.Entities;

namespace MovieTime.Web.MovieDetails
{
    public class MovieRepository : IMovieRepository
    {
        private readonly MovieContext _context;

        public MovieRepository(MovieContext context)
        {
            _context = context;
        }


        public IEnumerable<DbMovie> GetDatabaseMovies()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DbMovie> GetDatabaseMoviesByPage(int page = 0)
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

        }

        public void AddMovie(DbMovie movie)
        {
            _context.Movies.Add(movie);
        }
    }
}