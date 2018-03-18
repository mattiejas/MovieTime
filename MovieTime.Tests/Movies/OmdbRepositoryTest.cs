using AutoMapper;
using AutoMapper.Configuration;
using FluentAssertions;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using MovieTime.Web.Utilities;
using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Xunit;

namespace MovieTime.Tests.Movies
{

    public class OmdbRepositoryTest
    {
        private readonly IThirdPartyMovieRepository _movieRepository;

        public OmdbRepositoryTest()
        {
            var baseMappings = new MapperConfigurationExpression();
            baseMappings.AddProfile<MappingProfile>();
            var mapperConfig = new MapperConfiguration(baseMappings);

            _movieRepository = new OmdbMovieRepository(new Mapper(mapperConfig));
        }

        [Theory]
        [InlineData("tt0112529", "Blood Ring 2")]
        public async Task GetMovieById(string id, string title)
        {
            //Act
            var movie = await _movieRepository.GetMovieById(id);
            //Assert
            movie.Title.Should().Be(title);
        }

        [Theory]
        [InlineData("Blood Ring 2", "tt0112529")]
        public async Task GetMovieByTitle(string title, string id)
        {
            //Act
            var movie = await _movieRepository.GetMovieByTitle(title);
            //Assert
            movie.Id.Should().Be(id);
        }


        [Theory]
        [InlineData("The Matrix", 55, 1)]
        [InlineData("The Matrix", 55, 2)]
        public async Task GetMoviesByTitle(string title,int ExpectedTotalResults, int page)
        {
            //Arrange
            int expectedTotalPageCount = 10;
            //Act
            var result = await _movieRepository.GetMoviesByTitle(title, page);
            //Assert
            result.TotalResults.Should().Be(ExpectedTotalResults);
            result.Movies.Should().HaveCount(expectedTotalPageCount);
            result.Movies.TrueForAll(m => m.Title.Contains(title));
        }
        
        //[Fact]
        //public void GetMoviesByTitleControllerTest()
        //{
            // todo implement GetMoviesByTitleSearch
            //var controller = new MovieController(_omdbMovieRepository);
            //var searchResultsModel = controller.GetMovies("ring");
            //Assert.Equal(635, searchResultsModel.TotalResults);
 //       }
        
 //       [Fact]
  //      public void OmdbPerformanceTest()
//        {
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
//        }
    }
}