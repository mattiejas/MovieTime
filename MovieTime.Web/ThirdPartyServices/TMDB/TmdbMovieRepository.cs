using MovieTime.Web.Movies.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.ThirdPartyServices.TMDB
{   
    public class TmdbMovieRepository: IThirdPartyMovieRepository
    {
        public Task<IEnumerable<Movie>> GetMoviesByTitleSearch(string title)
        {
            throw new NotImplementedException();
        }

        public Task<Movie> GetMovieById(string id)
        {
            throw new NotImplementedException();
        }

        public Task<Movie> GetMovieByTitle(string title)
        {
            throw new NotImplementedException();
        }
    }
}