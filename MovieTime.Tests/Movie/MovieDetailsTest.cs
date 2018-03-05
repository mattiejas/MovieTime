using System;
using System.Diagnostics;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using MovieTime.Web.Models;
using MovieTime.Web.MovieDetails;
using Xunit;
using Serilog;

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
        public void OmdbPerformanceTest()
        {
            var searchResultsModel = _movieService.GetMoviesByTitle("Ring");
            // 10 results on a page, can change in the future
            Assert.Equal(10, searchResultsModel.Movies.Count);

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.Start();
            foreach (var movie in searchResultsModel.Movies)
            {
                _movieService.GetMoviesByTitle(movie.Title);
            }
            stopwatch.Stop();
            
            Log.Debug(stopwatch.Elapsed.Seconds.ToString());
            Assert.True(stopwatch.Elapsed.Seconds < 2);
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
