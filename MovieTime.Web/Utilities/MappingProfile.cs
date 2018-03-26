using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using AutoMapper;
using MovieTime.Web.Helpers;
using Microsoft.Extensions.Logging.AzureAppServices.Internal;
using Microsoft.IdentityModel.Protocols;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using MovieTime.Web.Users;
using MovieTime.Web.Users.Models;
using SQLitePCL;

namespace MovieTime.Web.Utilities
{
    public class MappingProfile : Profile
    {
        public static string getPosterLocation(string id) => $"assets\\posters\\{id}.jpg";     
        
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<OmdbMovieModel, Movie>()
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => new DateTime(Convert.ToInt32(src.Year), 1, 1)))
                .ForMember(dest => dest.RunTimeInMinutes, opt => opt.MapFrom(src => DataConverterHelper.ConvertOmdbRuntimeToInt(src.Runtime)));

            CreateMap<Movie, MovieGetDto>()
                .ForMember(dest => dest.ImdbId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Year.ToString()))
                .ForMember(dest => dest.Poster, opt => opt.MapFrom(src => getPosterLocation(src.Id)));
            
            CreateMap<MovieCreateDto, Movie>();


            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserGetDto, User>();
            CreateMap<User, UserGetDto>();

            CreateMap<SearchResultsModel, ShortMovieModel>();
            
            
            
        }
    }
}