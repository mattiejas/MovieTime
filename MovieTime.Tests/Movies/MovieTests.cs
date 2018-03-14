using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Database;
using MovieTime.Web.Movies;

namespace MovieTime.Tests.Movies
{
    public class MovieTests
    {
        [Fact]
        public void DatabaseMovieRepositoryTest()
        {
            var movies = new List<Movie>()
            {
                new Movie()
                {
                    Id = "1asd",
                    Title = "The legend of ORA, the potato",
                    Rating = 3.0,
                    Year = DateTime.Now
                },
                new Movie()
                {
                    Id = "2sdas",
                    Title = "The legend of ORA, the potato 2",
                    Rating = 6.0,
                    Year = DateTime.Now,
                },
                new Movie()
                {
                    Id = "3ras",
                    Title = "Kungfu panda",
                    Rating = 7.6,
                    Year = new DateTime(2008, 6, 6),
                }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<Movie>>(); 
            mockSet.As<IQueryable<Movie>>().Setup(m => m.Provider).Returns(movies.Provider); 
            mockSet.As<IQueryable<Movie>>().Setup(m => m.Expression).Returns(movies.Expression); 
            mockSet.As<IQueryable<Movie>>().Setup(m => m.ElementType).Returns(movies.ElementType); 
            mockSet.As<IQueryable<Movie>>().Setup(m => m.GetEnumerator()).Returns(movies.GetEnumerator()); 
 
            var mockContext = new Mock<MovieContext>(); 
            mockContext.Setup(c => c.Movies).Returns(mockSet.Object); 
 
            var service = new MovieRepository(mockContext.Object); 
            
            var movieById = service.GetMovieById("1asd"); 
            Assert.Equal("1asd", movieById.Id); 
            Assert.Equal("The legend of ORA, the potato", movieById.Title); 
            
            var movieByTitle = service.GetMovieByTitle("Kungfu panda"); 
            Assert.Equal("3ras", movieByTitle.Id); 
            Assert.Equal("Kungfu panda", movieByTitle.Title); 
        }
    }
}