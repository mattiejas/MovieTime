using System;
using MovieTime.Web.MovieDetails;
using Xunit;

namespace MovieTime.Tests.Movie
{
    public class MovieDetailsTest
    {
        [Fact]
        public void GetMovieByIdTest()
        {
            var movieModel = MovieService.GetMovieById("tt0112529");
            Assert.Equal("Blood Ring 2", movieModel.Title);
        }
        
        [Fact]
        public void GetMovieByTitleTest()
        {
            var movieModel = MovieService.GetMovieByTitle("Blood Ring 2");
            Assert.Equal("tt0112529", movieModel.ImdbId);
        }
        
        [Fact]
        public void GetMoviesByTitleTest()
        {
            var searchResultsModel = MovieService.GetMoviesByTitle("Ring");
            // 635 results for Ring, can change in the future
            Assert.Equal(635, searchResultsModel.TotalResults);
            // 10 results on a page, can change in the future
            Assert.Equal(10, searchResultsModel.Movies.Count);
        }
        
        
    }
}
