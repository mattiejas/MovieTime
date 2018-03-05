using System;
using AutoMapper;
using AutoMapper.Configuration;
using MovieTime.Web.Models;
using MovieTime.Web.MovieDetails;
using Xunit;

namespace MovieTime.Tests.Movie
{
    public class MovieDetailsTest
    {
        private readonly OmdbMovieRepository _omdbMovieRepository;
        
        public MovieDetailsTest()
        {
            var baseMappings = new MapperConfigurationExpression();
            baseMappings.AddProfile<MappingProfile>();
            var mapperConfig = new MapperConfiguration(baseMappings);
            
            _omdbMovieRepository = new OmdbMovieRepository(new Mapper(mapperConfig));
        }
        
        [Fact]
        public void GetMovieByIdTest()
        {
            var movieModel = _omdbMovieRepository.GetMovieDetailsById("tt0112529");
            Assert.Equal("Blood Ring 2", movieModel.Title);
        }
        
        [Fact]
        public void GetMovieByTitleTest()
        {
            var movieModel = _omdbMovieRepository.GetMovieDetailsByTitle("Blood Ring 2");
            Assert.Equal("tt0112529", movieModel.ImdbId);
        }
        
        [Fact]
        public void GetMoviesByTitleTest()
        {
            var searchResultsModel = _omdbMovieRepository.GetMoviesByTitle("Ring");
            // 635 results for Ring, can change in the future
            Assert.Equal(635, searchResultsModel.TotalResults);
            // 10 results on a page, can change in the future
            Assert.Equal(10, searchResultsModel.Movies.Count);
        }
        
        [Fact]
        public void GetMoviesByTitleControllerTest()
        {
          //  var controller = new MovieController(_omdbMovieRepository);
          //  var searchResultsModel = controller.GetMovies("ring");
         //   Assert.Equal(635, searchResultsModel.TotalResults);
        }
    }
}
