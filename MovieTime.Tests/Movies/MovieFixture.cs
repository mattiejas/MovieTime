using AutoMapper;
using Moq;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MovieTime.Tests.Movies
{
    public class MovieFixture
    {

        internal static IMapper CreateMockMapper()
        {
            var mockMapper = new Mock<IMapper>();
            mockMapper.Setup(x => x.Map<Movie>(It.IsAny<OmdbMovieModel>()))
                .Returns((OmdbMovieModel source) =>
                {
                    var movie = new Movie()
                    {
                        Id = source.Id,
                        Title = source.Title
                    };

                    return movie;
                });

            return mockMapper.Object;
        }


    }
}
