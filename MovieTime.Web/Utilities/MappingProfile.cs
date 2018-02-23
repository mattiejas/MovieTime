using AutoMapper;
using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<OmdbMovieModel, MovieDetailsViewModel>();
            CreateMap<MovieDetailsViewModel, OmdbMovieModel>();
        }
    }
}