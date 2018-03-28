using System;
using AutoMapper;
using MovieTime.Web.Helpers;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using MovieTime.Web.Users;
using MovieTime.Web.Users.Models;
using MovieTime.Web.TrackedMovies.Models;

namespace MovieTime.Web.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<OmdbMovieModel, Movie>()
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => new DateTime(Convert.ToInt32(src.Year), 1, 1)))
                .ForMember(dest => dest.RunTimeInMinutes, opt => opt.MapFrom(src => DataConverterHelper.ConvertOmdbRuntimeToInt(src.Runtime)));

            CreateMap<Movie, MovieGetDto>()
                .ForMember(dest => dest.ImdbId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Year.ToString()));
            
            CreateMap<MovieCreateDto, Movie>();

            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserGetDto, User>();
            CreateMap<User, UserGetDto>();

            CreateMap<SearchResultsModel, ShortMovieModel>();

            CreateMap<TrackedMovieGetDto, TrackedMovie>();
            CreateMap<TrackedMoviesGetDto, TrackedMovie>()
                .ForPath(dest => dest.Movie.Title, opt => opt.MapFrom(src => src.Title))
                .ForPath(dest => dest.Movie.Year, opt => opt.MapFrom(src => src.Year))
                .ForPath(dest => dest.Movie.RunTimeInMinutes, opt => opt.MapFrom(src => src.Length))
                .ForPath(dest => dest.Movie.Poster, opt => opt.MapFrom(src => src.Poster))
                .ForPath(dest => dest.Watched, opt => opt.MapFrom(src => src.Watched))
                .ReverseMap();
        }
    }
}