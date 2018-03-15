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
    public class MovieTests
    {
        [Fact]
        public void DatabaseMovieRepositoryTest()
        {
            var movies = new List<DbMovie>()
            {
                new DbMovie()
                {
                    Id = "1asd",
                    Title = "The legend of ORA, the potato",
                    Rating = 3.0,
                    Year = DateTime.Now
                },
                new DbMovie()
                {
                    Id = "2sdas",
                    Title = "The legend of ORA, the potato 2",
                    Rating = 6.0,
                    Year = DateTime.Now,
                },
                new DbMovie()
                {
                    Id = "3ras",
                    Title = "Kungfu panda",
                    Rating = 7.6,
                    Year = new DateTime(2008, 6, 6),
                }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<DbMovie>>(); 
            mockSet.As<IQueryable<DbMovie>>().Setup(m => m.Provider).Returns(movies.Provider); 
            mockSet.As<IQueryable<DbMovie>>().Setup(m => m.Expression).Returns(movies.Expression); 
            mockSet.As<IQueryable<DbMovie>>().Setup(m => m.ElementType).Returns(movies.ElementType); 
            mockSet.As<IQueryable<DbMovie>>().Setup(m => m.GetEnumerator()).Returns(movies.GetEnumerator()); 
 
            var mockContext = new Mock<MovieContext>(); 
            mockContext.Setup(c => c.Movies).Returns(mockSet.Object); 
 
            var service = new DatabaseMovieRepository(mockContext.Object); 
            
            var movieById = service.GetMovieById("1asd"); 
            Assert.Equal("1asd", movieById.Id); 
            Assert.Equal("The legend of ORA, the potato", movieById.Title); 
            
            var movieByTitle = service.GetMovieByTitle("Kungfu panda"); 
            Assert.Equal("3ras", movieByTitle.Id); 
            Assert.Equal("Kungfu panda", movieByTitle.Title); 
        }
    }
}