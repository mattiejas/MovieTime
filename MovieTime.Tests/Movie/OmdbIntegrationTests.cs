using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MovieTime.Web.Movie.Repositories;
using MovieTime.Web.Utilities;
using Xunit;
using Serilog;
using Moq;
using MovieTime.Web.Movie.Persistance;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Tests.Movie
{

    public class OmdbIntegrationTests
    {
        private readonly IMovieRepository _movieRepository;
        
        public OmdbIntegrationTests()
        {
            var baseMappings = new MapperConfigurationExpression(); 
            baseMappings.AddProfile<MappingProfile>(); 
            var mapperConfig = new MapperConfiguration(baseMappings); 
             
            _movieRepository = new OmdbMovieRepository(new Mapper(mapperConfig)); 
        }
        
        [Fact]
        public void GetMovieByIdTest()
        {
            var movieModel = _movieRepository.GetMovieById("tt0112529");
            Assert.Equal("Blood Ring 2", movieModel.Title);
        }

        [Fact]
        public void GetMovieByTitleTest()
        {
            var movieModel = _movieRepository.GetMovieByTitle("Blood Ring 2");
            Assert.Equal("tt0112529", movieModel.Id);
        }

       
        [Fact]
        public void GetMoviesByTitleTest()
        {
            // todo implement GetMoviesByTitleSearch
//            var searchResultsModel = _omdbMovieRepository.GetMoviesByTitle("Ring");
//            // 635 results for Ring, can change in the future
//            Assert.Equal(635, searchResultsModel.TotalResults);
//            // 10 results on a page, can change in the future
//            Assert.Equal(10, searchResultsModel.Movies.Count);
        }
        
        [Fact]
        public void GetMoviesByTitleControllerTest()
        {
            // todo implement GetMoviesByTitleSearch
            //var controller = new MovieController(_omdbMovieRepository);
            //var searchResultsModel = controller.GetMovies("ring");
            //Assert.Equal(635, searchResultsModel.TotalResults);
        }
        
        [Fact]
        public void OmdbPerformanceTest()
        {
            // todo implement GetMoviesByTitleSearch
//            var searchResultsModel = _movieRepository.GetMoviesByTitleSearch("Ring");
//            // 10 results on a page, can change in the future
//            Assert.Equal(10, searchResultsModel.Movies.Count);
//
//            Stopwatch stopwatch = new Stopwatch();
//            stopwatch.Start();
//            foreach (var movie in searchResultsModel.Movies)
//            {
//                _movieRepository.GetMoviesByTitleSearch((movie.Title);
//            }
//            stopwatch.Stop();
//            
//            Log.Debug(stopwatch.Elapsed.Seconds.ToString());
//            Assert.True(stopwatch.Elapsed.Seconds < 2);
        }
    }
}