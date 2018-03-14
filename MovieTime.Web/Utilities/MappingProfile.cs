using System;
using AutoMapper;
using MovieTime.Web.Movie.Persistance.Database;
using MovieTime.Web.Movie.Persistance.Omdb;
using MovieTime.Web.Movie.Persistance.ViewModels;
using MovieTime.Web.Users;

namespace MovieTime.Web.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<OmdbMovieModel, DbMovie>()
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => new DateTime(Convert.ToInt32(src.Year), 1, 1)));

            CreateMap<DbMovie, MovieDetailsViewModel>()
                .ForMember(dest => dest.ImdbId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Year.ToString()));
            
            CreateMap<DbMovie, MovieDetailDto>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Year.Year.ToString()));
            
            CreateMap<MovieForCreationDto, DbMovie>();


            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();
        }
    }
}