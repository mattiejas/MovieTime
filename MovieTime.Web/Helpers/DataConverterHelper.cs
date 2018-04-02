using System.Collections.Generic;
using System.Text.RegularExpressions;
using MovieTime.Web.Genres;
using MovieTime.Web.Genres.Models;

namespace MovieTime.Web.Helpers
{
    public class DataConverterHelper
    {
        public static int? ConvertOmdbRuntimeToInt(string runTime)
        {
            const string nonNumericCharactersRegex = "[^\\d]";
            var runTimeInMinutes = Regex.Replace(runTime, nonNumericCharactersRegex, "");
            
            if (runTimeInMinutes.Length <= 0) return null;
            
            return short.Parse(runTimeInMinutes);
        }

        public static ICollection<MovieGenre> ConvertOmdbGenresToCollection(string genres, string movieId)
        {
            const string seperator = ",";
            const string removeUnusedCharacter = " ";
            
            var genresArray = genres.Replace(removeUnusedCharacter, "").Split(seperator);
            var movieGenres = new List<MovieGenre>();
            foreach (var genre in genresArray)
            {
                movieGenres.Add(new MovieGenre()
                {
                    DbGenreId = genre,
                    DbMovieId = movieId
                });
            }

            return movieGenres;
        }
    }
}