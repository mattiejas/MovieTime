using MovieTime.Web.MovieDetails;

namespace MovieTime.Web.Services
{
    public interface IDatabaseMovieRespository : IMovieRepository
    {
        void DeleteMovieById(string id);
        void DeleteMovieByTitle(string title);
        void AddMovie(DbMovie movie);
    }
}