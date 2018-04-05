using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using MovieTime.Web.Genres;
using MovieTime.Web.Genres.GenreModels;
using MovieTime.Web.Genres.MovieGenreModels;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Users;
using Serilog;

namespace MovieTime.Web.Database
{
    public static class MovieContextExtensions
    {
        /**
         * Applies all pending migrations automatically.
         *
         * Instructions:
         * In order to update the database, you have to create a migration first.
         * One of the possible approach for this project is to create migration in the master branch before deploying it.
         * 
         * The instructions to create a new migration:
         * ----------------------------------------------------------
         * cd ....MovieTime.Web (locate to the web project)
         * dotnet restore
         * dotnet ef migrations add <Name_Migration>
         * ----------------------------------------------------------
         *
         * In the migration folder, the <name_migration> shows down and up methods.
         * If both methods are empty, migration can be deleted since no changes in entities occured.
         * ----------------------------------------------------------
         * dotnet ef migrations remove
         * ----------------------------------------------------------
         *
         * The migration will be applied by this method. So there is no need to call 'dotnet ef database update' command.
         *
         * Todo: In production, it's recommended to run migration scripts instead.
         */
        public static void MigratePendingChanges(this MovieContext context)
        {
            context.Database.Migrate();
        }

        //DEVELOPMENT ONLY!
        private static void EnsureApplicationIsRunningInDev(IHostingEnvironment env)
        {
            if (env == null || !env.IsDevelopment())
            {
                throw new ConstraintException("Dropping database is not allowed in non development environment.");
            }
        }

        /**
         * Recreates database without migration when the database doesn't exists or when the database is previously created through migration.
         * All current data will be replaced by initial mockup data.
         */
        public static void PrepareDatabaseWithoutMigration(this MovieContext context, IHostingEnvironment env)
        {
            EnsureApplicationIsRunningInDev(env);

            context.Database.EnsureCreated();

            // Todo: A check we are missing is whether or not the db schema's are in sync with the EF entities.
            // Todo: If not, recreate the database. However, there is no efficient way to compare them right now.
            // Todo: As compensation, we inform the programmer with the next log.

            Log.Information(
                "The project is configured not to drop the (dev) database on every run.\n" +
                "Retaining records however means that (code first) changes in entities won't \n" +
                "be applied automatically to the database untill you recreate the database.\n" +
                "You can set 'clearLocalDbOnRun' in appsettings to true to recreate/seed the database.\n" +
                "Run the project to apply the changes. 'clearLocalDbOnRun' can be set to false afterwards.\n" +
                "Another way is to drop the database manually or set 'useMigration' in appsettings to true\n" +
                "to use migrations instead. Create a migration manually to apply changes.");

            // By checking if the database has a migration table, we can determine whether or not action is required. 
            var migrations = context.Database.GetAppliedMigrations();
            if (!migrations.Any()) return;
            

            SeedContextWithoutMigration(context, env);
        }

        /**
         * Recreates database with migration when the database doesn't exists or when the database is previously created without migration.
         * All current data will be replaced by initial mockup data.
         */
        public static void PrepareDatabaseWithMigration(this MovieContext context, IHostingEnvironment env)
        {
            EnsureApplicationIsRunningInDev(env);

            var appliedMigration = context.Database.GetAppliedMigrations();
            var allMigrations = context.Database.GetMigrations();
            var pendingMigrations = context.Database.GetPendingMigrations();

            if (!allMigrations.Any())
            {
                throw new FileNotFoundException(
                    "Missing applyable migrations. Please create a migration first.\n" +
                    "Execute the next commands in terminal to create a new migratin:\n" +
                    "---------------------------------------------------------------\n" +
                    "cd ...../...../MovieTime.Web (locate to your project project folder)\n" +
                    "dotnet restore\n" +
                    "dotnet ef migrations add <NewMigrationName>\n" +
                    "---------------------------------------------------------------\n" +
                    "Do not apply the update manually with 'dotnet ef database update' command");
            }

            // Database is up to date, do nothing.
            // Todo, it's possible that local db has old migrations that don't exist in project anymore.
            // Todo, In that case, we have to compare the migrations with eachother.
            if (!pendingMigrations.Any() && appliedMigration.Any()) return;

            if (pendingMigrations.Any() && !appliedMigration.Any())
            {
                SeedContextWithMigration(context, env);
            }
            else if (pendingMigrations.Any() && appliedMigration.Any())
            {
                MigratePendingChanges(context);
            }
        }

        /**
         * Set the database to initial state with mockup data. This method can only be used in development environment.
         * No migration needed since EnsureCreated is used instead to update database structure.
         */
        public static void SeedContextWithoutMigration(this MovieContext context, IHostingEnvironment env)
        {
            EnsureApplicationIsRunningInDev(env);

            // Making backup while db or entity doesn't exits will lead to uncatchable exception. So ensure db is created before making backup.
            context.Database.EnsureCreated();
            var usersBackup = new List<User>();
            if (context.Users.Any()) usersBackup = context.Users.ToList();

            // Recreate database to set the state of the database to the current structure.
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            // Insert the database with mockup data.
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
         * Set the database to initial state with mockup data. This method can only be used in development environment.
         * Migrations are used to initialise database. Ensure at least one migration is created before using this method.
         *
         * In case you manually update the database by applying migration (via cmd),
         * you may get an 'object <Entity> already exists' error.
         * When this problem occurs, manually delete your database first. Databases created by EnsureCreated() ignores
         * migration, which can lead to conflict when migration occurs afterwards.
         */
        public static void SeedContextWithMigration(this MovieContext context, IHostingEnvironment env)
        {
            EnsureApplicationIsRunningInDev(env);

            // MIGRATION MUST EXIST
            var migrations = context.Database.GetMigrations();
            if (!migrations.Any()) throw new FileNotFoundException();

            // BACKUP DATA
            // Making backup while db or entity doesn't exits will lead to uncatchable exception. Ensure db is created.
            context.Database.EnsureCreated();

            var usersBackup = new List<User>();
            if (context.Users.Any()) usersBackup = context.Users.ToList();

            // DELETE DATABASE
            context.Database.EnsureDeleted();

            // INIT DATABASE
            context.MigratePendingChanges();

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
                    Id = "yjAJ53WfPXVs9sP3Vg9RD0tAdvm1",
                    FirstName = "Matthias",
                    LastName = "Aarnoutse",
                    Email = "matt.aarnoutse@outlook.com"
                },
                new User
                {
                    Id = "6OBuN1B9X6MR8ftamRaum3nnHC93",
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
                new User
                {
                    Id = "ltkGR8I6PQbTPeIKutUXFLywQAG3",
                    FirstName = "Okkes",
                    LastName = "Doker",
                    Email = "1@1111.nl"
                }
            };
            return users;
        }
    }
}