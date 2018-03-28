﻿using System;
using System.Collections;
using System.Collections.Generic;
using AutoMapper;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using MovieTime.Web.ThirdPartyServices.OMDB.Movies;
using MovieTime.Web.Users;
using MovieTime.Web.Users.Models;

namespace MovieTime.Web.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<OmdbMovieModel, Movie>()
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => new DateTime(Convert.ToInt32(src.Year), 1, 1)));

            CreateMap<Movie, MovieGetDto>()
                .ForMember(dest => dest.ImdbId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year.Year.ToString()));
            
            CreateMap<MovieCreateDto, Movie>();

            CreateMap<ShortMovieModel, ShortMovieDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ImdbId))
                .ForMember(dest => dest.Genre, opt => opt.MapFrom(src => src.Type));

            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserGetDto, User>();
            CreateMap<User, UserGetDto>();

            CreateMap<SearchResultsModel, ShortMovieModel>();
        }
    }
}