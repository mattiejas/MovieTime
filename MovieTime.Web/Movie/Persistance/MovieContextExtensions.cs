using System;
using System.Collections.Generic;
using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Persistance
{
    public static class MovieContextExtensions
    {
        public static void EnsureSeedDataForContext(this MovieContext context)
        {
            // Clear the database. Don't do this for production environment(s)
            context.Database.EnsureCreated();
            context.Movies.RemoveRange(context.Movies);
            context.Genres.RemoveRange(context.Genres);
            context.MovieGenre.RemoveRange(context.MovieGenre);
            context.SaveChanges();

            // INIT SEED DATA

            // ** Genres **
            var genres = new List<DbGenre>()
            {
                new DbGenre()
                {
                    CustomField = false,
                    Name = "Comedy"
                },

                new DbGenre()
                {
                    CustomField = false,
                    Name = "Animation"
                },
                new DbGenre()
                {
                    CustomField = false,
                    Name = "Action"
                },
                new DbGenre()
                {
                    CustomField = false,
                    Name = "Adventure"
                },
                new DbGenre()
                {
                    CustomField = false,
                    Name = "Horror"
                },
                new DbGenre()
                {
                    CustomField = false,
                    Name = "Thriller"
                }
            };

            // ** Movies **
            var movies = new List<DbMovie>()
            {
                new DbMovie()
                {
                    Id = "25320c5e-f58a-4b1f-b63a-8ee07a840bd3",
                    Title = "The legend of ORA, the potato",
                    Actors = "John, Maco, Sphent",
                    Director = "Peter",
                    Plot = "Long time ago, the legend of ORA was born. One day Little ORA decided to...",
                    Poster = "https://en.wikipedia.org/wiki/Potato#/media/File:Patates.jpg",
                    Rating = 3.0,
                    RunTimeInMinutes = 120,
                    Writer = "Super Saiyan",
                    Year = DateTime.Now,
                },

                new DbMovie()
                {
                    Id = "25320c5e-f58a-4b1f-b63a-8ee07a840bdf",
                    Title = "The legend of ORA, the potato 2",
                    Actors = "John 2, Maco 2, Sphent 2",
                    Director = "Peter 2",
                    Plot = "Long time ago 2, the legend of ORA was born. One day Little ORA decided to...",
                    Poster = "https://en.wikipedia.org/wiki/Potato#/media/File:Patates.jpg",
                    Rating = 6.0,
                    RunTimeInMinutes = 118,
                    Writer = "Super Saiyan Instinct",
                    Year = DateTime.Now,
                },

                new DbMovie()
                {
                    Id = "25320c5e-f58a-4b1f-b63a-8ee07a840bd1",
                    Title = "Kungfu panda",
                    Actors = "Johny bravo",
                    Director = "Bravo John",
                    Plot = "The panda, which learned his kung fu from....",
                    Poster = "http://www.imdb.com/title/tt0441773/mediaviewer/rm2261620224?ref_=tt_ov_i",
                    Rating = 7.6,
                    RunTimeInMinutes = 92,
                    Writer = "Jonathan Aibel",
                    Year = new DateTime(2008, 6, 6),
                }
            };

            // ** Linking Movies with Genres
            var movieGenre = new List<DbMovieGenre>(){
                new DbMovieGenre(){
                    DbMovieId = movies[0].Id,
                    DbGenreId = genres[3].Name
                },
                new DbMovieGenre(){
                    DbMovieId = movies[0].Id,
                    DbGenreId = genres[4].Name
                },

                new DbMovieGenre(){
                    DbMovieId = movies[1].Id,
                    DbGenreId = genres[3].Name
                },

                new DbMovieGenre(){
                    DbMovieId = movies[2].Id,
                    DbGenreId = genres[0].Name
                },
                new DbMovieGenre(){
                    DbMovieId = movies[2].Id,
                    DbGenreId = genres[1].Name
                },
                new DbMovieGenre(){
                    DbMovieId = movies[2].Id,
                    DbGenreId = genres[2].Name
                },
            };

            context.Movies.AddRange(movies);
            context.Genres.AddRange(genres);
            context.MovieGenre.AddRange(movieGenre);
            context.SaveChanges();
        }
    }
}