using System;
using System.Linq;
using AutoMapper;
using MovieTime.Web.Comments;
using MovieTime.Web.Helpers;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using MovieTime.Web.Users;
using MovieTime.Web.Users.Models;
using MovieTime.Web.TrackedMovies.Models;
using MovieTime.Web.Users.Models.GDPR;

namespace MovieTime.Web.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<OmdbMovieModel, Movie>()
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => new DateTime(Convert.ToInt32(src.Year), 1, 1)))
                .ForMember(dest => dest.Genres, opt => opt.MapFrom(src => DataConverterHelper.ConvertOmdbGenresToCollection(src.Genre, src.Id)))
                .ForMember(dest => dest.RunTimeInMinutes, opt => opt.MapFrom(src => DataConverterHelper.ConvertOmdbRuntimeToInt(src.Runtime)));

            CreateMap<Movie, MovieGetDto>()
                .ForMember(dest => dest.ImdbId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Year.ToString()))
                .ForMember(dest => dest.Genres, opt => opt.MapFrom(x => x.Genres.Select(y => y.DbGenreId).ToList()))
                .ForMember(dest => dest.RunTime, opt => opt.MapFrom(src => src.RunTimeInMinutes));
            
            CreateMap<MovieCreateDto, Movie>();

            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserGetDto, User>();
            CreateMap<User, UserGetDto>();

            CreateMap<CommentCreateDto, Comment>();
            CreateMap<Comment, CommentGetByUserDto>();
            CreateMap<Comment, CommentGetOnMovieDto>();

            CreateMap<SearchResultsModel, ShortMovieModel>();

            CreateMap<TrackedMovieGetDto, TrackedMovie>();
            CreateMap<TrackedMoviesGetDto, TrackedMovie>()
                .ForPath(dest => dest.Movie.Title, opt => opt.MapFrom(src => src.Title))
                .ForPath(dest => dest.Movie.Year, opt => opt.MapFrom(src => src.Year))
                .ForPath(dest => dest.Movie.RunTimeInMinutes, opt => opt.MapFrom(src => src.RunTime))
                .ForPath(dest => dest.Movie.Poster, opt => opt.MapFrom(src => src.Poster))
                .ForPath(dest => dest.Watched, opt => opt.MapFrom(src => src.Watched))
                .ForPath(dest => dest.CreatedTime, opt => opt.MapFrom(src => src.CreatedTime))
                .ReverseMap();

            CreateMap<User, UserGdprDto>();
            CreateMap<Comment, MovieCommentGdprDto>()
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title));
            CreateMap<TrackedMovie, MovieTrackGdprDto>()
                .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Movie.Title));
        }
    }
}