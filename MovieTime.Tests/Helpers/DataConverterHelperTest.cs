using System;
using System.Collections.Generic;
using FluentAssertions;
using FluentAssertions.Collections;
using MovieTime.Web.Genres.MovieGenreModels;
using MovieTime.Web.Helpers;
using Xunit;

namespace MovieTime.Tests.Helpers
{
    public class DataConverterHelperTest
    {
        [Theory]
        [InlineData("123 min", 123)]
        [InlineData("", null)]
        [InlineData("532 ", 532)]
        [InlineData("min", null)]
        [InlineData("280", 280)]
        public void TestOmdbRunTimeConverterWithCharacters(string runTime, int? expectedResult)
        {
            var result = DataConverterHelper.ConvertOmdbRuntimeToInt(runTime);
            result.Should().Be(expectedResult);
        }

        [Theory]
        [InlineData("Horror, Thriller", "3")]
        public void TestOmdbGenreConverterWithSeperator(string genres, string movie)
        {
            var expected = new List<MovieGenre>()
            {
                new MovieGenre()
                {
                    DbGenreId = "Horror",
                    DbMovieId = "3"
                },
                new MovieGenre()
                {
                    DbGenreId = "Thriller",
                    DbMovieId = "3"
                }
            };
            
            var actual = DataConverterHelper.ConvertOmdbGenresToCollection(genres, movie);

            int counter = 0;
            foreach (var movieGenre in actual)
            {
                var movieIdExpected = expected[counter].DbMovieId;
                var genreIdExpected = expected[counter].DbGenreId;

                var movieIdActual = movieGenre.DbMovieId;
                var genreIdActual = movieGenre.DbGenreId;

                Assert.Equal(movieIdExpected, movieIdActual);
                Assert.Equal(genreIdExpected, genreIdActual);

                counter++;
            }
            
        }
        
        [Theory]
        [InlineData("Horror Thriller", "3")]
        public void TestOmdbGenreConverterWithoutSeperator(string genres, string movie)
        {
            var expected = new List<MovieGenre>()
            {
                new MovieGenre()
                {
                    DbGenreId = "HorrorThriller",
                    DbMovieId = "3"
                }
            };
            
            var actual = DataConverterHelper.ConvertOmdbGenresToCollection(genres, movie);

            int counter = 0;
            foreach (var movieGenre in actual)
            {
                var movieIdExpected = expected[counter].DbMovieId;
                var genreIdExpected = expected[counter].DbGenreId;

                var movieIdActual = movieGenre.DbMovieId;
                var genreIdActual = movieGenre.DbGenreId;

                Assert.Equal(movieIdExpected, movieIdActual);
                Assert.Equal(genreIdExpected, genreIdActual);

                counter++;
            }
            
        }
    }
}