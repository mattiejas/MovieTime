using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using MovieTime.Web.Genres;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;

namespace MovieTime.Web.Database
{
    public static class MovieContextExtensions
    {
        /**
         * Set the database to initial state with mockup data.
         * No migrations needed since EnsureCreated is used instead
         */
        public static void SeedContextWithoutMigration(this MovieContext context, IHostingEnvironment env)
        {
            // FOR DEVELOPMENT ONLY!
            if (!env.IsDevelopment()) return;
            
            // BACKUP DATA
            // Making backup while db or entity doesn't exits will lead to uncatchable exception. So ensure db is created.
            context.Database.EnsureCreated();

            var usersBackup = new List<User>();
            if (context.Users.Any()) usersBackup = context.Users.ToList();

            // DELETE DATABASE
            context.Database.EnsureDeleted();

            // INIT DATABASE
            context.Database.EnsureCreated();

            // INSERT DATA
            var genres = GetGenresSampleData();
            var movies = GetMoviesSampleData();
            var movieGenre = GetMovieGenresSampleData(movies, genres);
            var users = usersBackup.Count <= 0 ? GetUsersSampleData() : usersBackup;

            context.Movies.AddRange(movies);
            context.Genres.AddRange(genres);
            context.MovieGenre.AddRange(movieGenre);
            context.Users.AddRange(users);
            context.SaveChanges();
        }

        /**
         * Set the database to initial state with mockup data.
         * Migrations are used to initialise database. Ensure at least one migration is created before using this method.
         *
         * In case you manually update the database (via cdm) by applying migration,
         * you may get an 'object <Entity> already exists' error.
         * When that problem occurs, manually delete your database first. Databases created by EnsureCreated() ignores
         * migration, which can lead to conflict when migration occurs afterwards.
         */
        public static void SeedContext(this MovieContext context, IHostingEnvironment env)
        {
            // FOR DEVELOPMENT ONLY!
            if (!env.IsDevelopment()) return;
            
            // BACKUP DATA
            // Making backup while db or entity doesn't exits will lead to uncatchable exception. Ensure db is created.
            context.Database.EnsureCreated();
            
            var usersBackup = new List<User>();
            if (context.Users.Any()) usersBackup = context.Users.ToList();

            // DELETE DATABASE
            context.Database.EnsureDeleted();

            // INIT DATABASE
            context.Database.Migrate();

            // INSERT DATA
            var genres = GetGenresSampleData();
            var movies = GetMoviesSampleData();
            var movieGenre = GetMovieGenresSampleData(movies, genres);
            var users = usersBackup.Count <= 0 ? GetUsersSampleData() : usersBackup;

            context.Movies.AddRange(movies);
            context.Genres.AddRange(genres);
            context.MovieGenre.AddRange(movieGenre);
            context.Users.AddRange(users);
            context.SaveChanges();
        }

        private static List<Genre> GetGenresSampleData()
        {
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

            return genres;
        }

        private static List<Movie> GetMoviesSampleData()
        {
            var movies = new List<Movie>()
            {
                new Movie()
                {
                    Id = "7861a023-57a0-4fae-86a2-4d19026da320",
                    Title = "The legend of ORA, the potato Test Data",
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
                    Title = "The legend of ORA, the potato 2 Test Data",
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
                    Title = "Kungfu panda Test data",
                    Actors = "Johny bravo",
                    Director = "Bravo John",
                    Plot = "The panda, which learned his kung fu from....",
                    Poster = "http://www.imdb.com/title/tt0441773/mediaviewer/rm2261620224?ref_=tt_ov_i",
                    RunTimeInMinutes = 92,
                    Writer = "Jonathan Aibel",
                    Year = new DateTime(2008, 6, 6),
                }
            };

            return movies;
        }

        private static List<MovieGenre> GetMovieGenresSampleData(List<Movie> movies, List<Genre> genres)
        {
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

            return movieGenre;
        }

        private static List<User> GetUsersSampleData()
        {
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
                    Id = "JdS1lQ51BmYTqgNe2zDLPfr3SLk1",
                    FirstName = "Matthias",
                    LastName = "Aarnoutse",
                    Email = "matt.aarnoutse@outlook.com"
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
                },
                new User
                {
                    Id = "uk8vAfunAQS4jhGdYkPIWnyYLNM2",
                    FirstName = "Hermen",
                    LastName = "Otter",
                    Email = "14144697@student.hhs.nl"
                },
            };
            return users;
        }
    }
}