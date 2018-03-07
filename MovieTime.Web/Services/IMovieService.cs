using System;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Services
{
    public interface IMovieService
    {
        MovieDetailsViewModel GetMovieDetailsById(string id);
        MovieDetailsViewModel GetMovieDetailsByTitle(string title);
        Models.SearchResultsModel GetMoviesByTitle(string title);
    }
}
