using MovieTime.Web.Movies.Models;
using System;
using System.Collections.Generic;

namespace MovieTime.Web.ThirdPartyServices.TMDB
{   
    public class TmdbMovieRepository: IThirdPartyMovieRepository
    {
        public IEnumerable<Movie> GetMoviesByTitleSearch(string title)
        {
            throw new System.NotImplementedException();
        }

        public Movie GetMovieById(string id)
        {
            throw new System.NotImplementedException();
        }

        public Movie GetMovieByTitle(string title)
        {
            throw new System.NotImplementedException();
        }

        IEnumerable<Movie> IThirdPartyMovieRepository.GetMoviesByTitleSearch(string title)
        {
            throw new NotImplementedException();
        }

        Movie IThirdPartyMovieRepository.GetMovieById(string id)
        {
            throw new System.NotImplementedException();
        }

        Movie IThirdPartyMovieRepository.GetMovieByTitle(string title)
        {
            throw new System.NotImplementedException();
        }
    }
}