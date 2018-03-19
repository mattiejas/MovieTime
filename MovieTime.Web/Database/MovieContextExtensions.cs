using System;
using System.Collections.Generic;
using MovieTime.Web.Genres;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Database
{
    public static class MovieContextExtensions
    {
        public static void EnsureSeedDataForContext(this MovieContext context)
        {
            // Clear the database. Don't do this for production environment(s)
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
//            context.Movies.RemoveRange(context.Movies);
//            context.Genres.RemoveRange(context.Genres);
//            context.MovieGenre.RemoveRange(context.MovieGenre);
//            context.SaveChanges();

            // INIT SEED DATA

            // ** Genres **
            var genres = new List<Genre>()
            {
                new Genre()
                {
                    Name = "Comedy"
                },

                new Genre()
                {
                    Name = "Animation"
                },
                new Genre()
                {
                    Name = "Action"
                },
                new Genre()
                {
                    Name = "Adventure"
                },
                new Genre()
                {
                    Name = "Horror"
                },
                new Genre()
                {
                    Name = "Thriller"
                },
                new Genre()
                {
                    Name = "Drama"
                }
            };

            // ** Movies **
            var movies = new List<Movie>()
            {
                new Movie()
                {
                    Id = "7861a023-57a0-4fae-86a2-4d19026da320",
                    Title = "The legend of ORA, the potato",
                    Actors = "John, Maco, Sphent",
                    Director = "Peter",
                    Plot = "Long time ago, the legend of ORA was born. One day Little ORA decided to...",
                    Poster = "https://en.wikipedia.org/wiki/Potato#/media/File:Patates.jpg",
                    RunTimeInMinutes = 120,
                    Writer = "Super Saiyan",
                    Year = DateTime.Now,
                },

                new Movie()
                {
                    Id = "c2c43232-abeb-461a-a998-071721925ad9",
                    Title = "The legend of ORA, the potato 2",
                    Actors = "John 2, Maco 2, Sphent 2",
                    Director = "Peter 2",
                    Plot = "Long time ago 2, the legend of ORA was born. One day Little ORA decided to...",
                    Poster = "https://en.wikipedia.org/wiki/Potato#/media/File:Patates.jpg",
                    RunTimeInMinutes = 118,
                    Writer = "Super Saiyan Instinct",
                    Year = DateTime.Now,
                },

                new Movie()
                {
                    Id = "53fed9fa-75a2-477a-9568-dd6351ca4127",
                    Title = "Kungfu panda",
                    Actors = "Johny bravo",
                    Director = "Bravo John",
                    Plot = "The panda, which learned his kung fu from....",
                    Poster = "http://www.imdb.com/title/tt0441773/mediaviewer/rm2261620224?ref_=tt_ov_i",
                    RunTimeInMinutes = 92,
                    Writer = "Jonathan Aibel",
                    Year = new DateTime(2008, 6, 6),
                }
            };

            // ** Linking Movies with Genres
            var movieGenre = new List<MovieGenre>()
            {
                new MovieGenre()
                {
                    DbMovieId = movies[0].Id,
                    DbGenreId = genres[3].Name
                },
                new MovieGenre()
                {
                    DbMovieId = movies[0].Id,
                    DbGenreId = genres[4].Name
                },

                new MovieGenre()
                {
                    DbMovieId = movies[1].Id,
                    DbGenreId = genres[3].Name
                },

                new MovieGenre()
                {
                    DbMovieId = movies[2].Id,
                    DbGenreId = genres[0].Name
                },
                new MovieGenre()
                {
                    DbMovieId = movies[2].Id,
                    DbGenreId = genres[1].Name
                },
                new MovieGenre()
                {
                    DbMovieId = movies[2].Id,
                    DbGenreId = genres[2].Name
                },
            };

            var users = new List<User>
            {
                new User
                {
                    Id = "6d74f620-2e16-4b19-8bde-bbefa4cadf95",
                    FirstName = "Peter",
                    LastName = "Parker",
                    Email = "p_parker@outlook.com"
                },
                new User
                {
                    Id = "vgkyE9ifs0gVA0KJyxZ8ghSYBUy1",
                    FirstName = "Matthias",
                    LastName = "Aarnoutse",
                    Email = "m.aarnoutse117@gmail.com"
                },
                new User
                {
                    Id = "SdDQKV4mQZW9nHzGGR7RvOL4ofy2",
                    FirstName = "Jeffrey",
                    LastName = "Dufour",
                    Email = "15036278@student.hhs.nl"
                },
                new User
                {
                    Id = "9c696ab7-cacb-4fd8-9797-96fd83b93a4c",
                    FirstName = "MJ",
                    LastName = "Watson",
                    Email = "mj_watson@outlook.com"
                },
                new User
                {
                    Id = "7f90cc18-55b9-4f32-9f4e-26c9f18eca53",
                    FirstName = "Gwen",
                    LastName = "Stacy",
                    Email = "g_stacy@outlook.com"
                },
                new User
                {
                    Id = "36c57237-66d5-4330-ad5a-241d1c223415",
                    FirstName = "Harry",
                    LastName = "Osborn",
                    Email = "h_osborn@outlook.com"
                }
            };

            context.Movies.AddRange(movies);
            context.Genres.AddRange(genres);
            context.MovieGenre.AddRange(movieGenre);
            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}