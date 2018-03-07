using MovieTime.Web.Movie.Persistance.Database;

namespace MovieTime.Web.Movie.Repositories
{
    public interface IDatabaseMovieRespository : IMovieRepository
    {
        void DeleteMovieById(string id);
        void DeleteMovieByTitle(string title);
        void AddMovie(DbMovie movie);
    }
}