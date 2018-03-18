using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieTime.Web.ThirdPartyServices.TMDB
{   
    public class TmdbMovieRepository: IThirdPartyMovieRepository
    {
        public Task<SearchResultsModel> GetMoviesByTitle(string title, int page =0)
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