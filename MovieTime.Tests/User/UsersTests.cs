using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Moq;
using MovieTime.Web.Database;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;
using Xunit;

namespace MovieTime.Tests.User
{
    public class UsersTests
    {
        // Resource: https://stackoverflow.com/questions/40476233/how-to-mock-an-async-repository-with-entity-framework-core
        [Fact]
        public async Task DatabaseMovieRepositoryTest()
        {
//            //Arrange
//            var users = getUsers();
//            var mockContext = GetMovieContext(users);
//            var service = new UserRepository(mockContext);
//            //Act
//            Web.Users.User userById = await service.Get(1);
//            var totalUsers = await service.GetAll();
//            var count = totalUsers.Count();
//            //Assert
//            Assert.Equal(1, userById.Id);
//            Assert.Equal("Henk", userById.FirstName);
//            Assert.Equal(users.Count(), count);
        }

        private MovieContext GetMovieContext( IQueryable<Web.Users.User> users)
        {
            var mockSet = new Mock<DbSet<Web.Users.User>>();
            mockSet.As<IQueryable<Web.Users.User>>().Setup(m => m.Provider).Returns(users.Provider);
            mockSet.As<IQueryable<Movie>>().Setup(m => m.Expression).Returns(users.Expression);
            mockSet.As<IQueryable<Web.Users.User>>().Setup(m => m.ElementType).Returns(users.ElementType);
            mockSet.As<IQueryable<Web.Users.User>>().Setup(m => m.GetEnumerator()).Returns(users.GetEnumerator());
            var mockContext = new Mock<MovieContext>();
            mockContext.Setup(c => c.Users).Returns(mockSet.Object);

            return mockContext.Object;
        }

        private IQueryable<Web.Users.User> getUsers()
        {
            var users = new List<Web.Users.User>()
            {
                new Web.Users.User()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Henk",
                },
                new Web.Users.User()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Tom",
                },
                new Web.Users.User()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Peter",
                }
            }.AsQueryable();

            return users;
        }
    }
}