using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Users;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.Genres;
using MovieTime.Web.Reviews;

namespace MovieTime.Web.Database
{
    public class MovieContext : DbContext
    {
        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<Genre> Genres { get; set; }
        public virtual DbSet<MovieGenre> MovieGenre { get; set; }
        
        public virtual DbSet<User> Users { get; set; }
//        public virtual DbSet<Review> Reviews { get; set; }

        public MovieContext(DbContextOptions<MovieContext> options) : base(options) { }

        public MovieContext() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MovieGenre>()
                .HasKey(mg => new {mg.DbMovieId, mg.DbGenreId});

            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Movie)
                .WithMany(mv => mv.Genres)
                .HasForeignKey(mg => mg.DbMovieId);

            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Genre)
                .WithMany(m => m.Movies)
                .HasForeignKey(mg => mg.DbGenreId);

            var modelConfigMapping = GetEntityBuildingConfigs();
            foreach (IEntityModelBuildingConfig modelBuildingConfig in modelConfigMapping)
            {
                modelBuildingConfig.Map(modelBuilder);
            }
        }

        private IEnumerable<object> GetEntityBuildingConfigs()
        {
            var interfaceType = typeof(IEntityModelBuildingConfig);
            var interfaceAssembly = interfaceType.Assembly;
            var typesThatImplementInterface = interfaceAssembly.GetTypes()
                .Where(type => interfaceType.IsAssignableFrom(type) && !type.IsInterface && !type.IsAbstract)
                .Select(type => Activator.CreateInstance(type));

            return typesThatImplementInterface;
        }
    }
}