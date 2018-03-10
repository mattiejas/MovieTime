using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.EntityFrameworkCore;
using Moq;
using MovieTime.Web.Movie.Persistance;
using MovieTime.Web.Movie.Persistance.Database;
using MovieTime.Web.Movie.Repositories;
using MovieTime.Web.Users;
using MovieTime.Web.Utilities;
using Xunit;

namespace MovieTime.Tests.User
{
    public class UsersTests
    {
        [Fact]
        public void DatabaseMovieRepositoryTest()
        {
            var users = new List<UserModel>()
            {
                new UserModel()
                {
                    Id = 1,
                    FirstName = "Henk",
                },
                new UserModel()
                {
                    Id = 2,
                    FirstName = "Tom",
                },
                new UserModel()
                {
                    Id = 3,
                    FirstName = "Peter",
                }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<UserModel>>(); 
            mockSet.As<IQueryable<UserModel>>().Setup(m => m.Provider).Returns(users.Provider); 
            mockSet.As<IQueryable<DbMovie>>().Setup(m => m.Expression).Returns(users.Expression); 
            mockSet.As<IQueryable<UserModel>>().Setup(m => m.ElementType).Returns(users.ElementType); 
            mockSet.As<IQueryable<UserModel>>().Setup(m => m.GetEnumerator()).Returns(users.GetEnumerator()); 
 
            var mockContext = new Mock<MovieContext>(); 
            mockContext.Setup(c => c.Users).Returns(mockSet.Object);
            
            var service = new UsersRepository(mockContext.Object); 
            UserModel userById = service.GetUser(1);
            int totalUsers = service.GetAllUsers().Count();
            
            Assert.Equal(1, userById.Id); 
            Assert.Equal("Henk", userById.FirstName); 
            Assert.Equal(users.Count(), totalUsers); 
        }
    }
}