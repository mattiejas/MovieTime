using System;
using FluentValidation;
using MovieTime.Web.Movies.Models;

namespace MovieTime.Web.Movies
{
    public class MovieValidator : AbstractValidator<Movie>
    {
        public MovieValidator() {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).Length(1, 2000);
            RuleFor(x => x.Actors).Length(1, 2000);
            RuleFor(x => x.Director).Length(1, 2000);
            RuleFor(x => x.Genres).NotNull();
            RuleForEach(x => x.Genres).NotEmpty();
            RuleFor(x => x.Plot).Length(1, 4000);
            RuleFor(x => x.RunTimeInMinutes).GreaterThanOrEqualTo(1).LessThanOrEqualTo(1000);
            RuleForEach(x => x.TrackedMovies).NotEmpty();
        }
    }
}