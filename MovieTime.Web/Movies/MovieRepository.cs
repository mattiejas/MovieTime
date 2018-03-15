using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MovieTime.Web.Movies
{
    public class MovieRepository :  GenericRepository<Movie>, IMovieRespository
    {
        public MovieRepository(MovieContext context) : base(context)
        {
        }
    }
}