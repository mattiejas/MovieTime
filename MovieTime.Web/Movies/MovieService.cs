using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using Serilog;

namespace MovieTime.Web.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IThirdPartyMovieRepository _thirdPartyMovieRepository;
        private readonly IMovieRespository _movieRespository;
        private readonly IHostingEnvironment _hostingEnvironment;

        public MovieService(IThirdPartyMovieRepository thirdPartyMovieRepository,
            IMovieRespository databaseMovieRespository, IHostingEnvironment hostingEnvironment)
        {
            _thirdPartyMovieRepository = thirdPartyMovieRepository;
            _movieRespository = databaseMovieRespository;
            _hostingEnvironment = hostingEnvironment;
        }

        /**
         * Get the movie with the given id.
         * The business rule is to give internal database higher priority than third party databases.
         * If the movie doesn't exist in internal database, get it from third party database.
         */
        public async Task<Movie> GetMovieById(string id)
        {
            var movieModel = await _movieRespository.Find(x => x.Id.ToLower() == id.ToLower());
            
            if (movieModel != null) return movieModel;

            movieModel = await _thirdPartyMovieRepository.GetMovieById(id);
            await AddMovie(movieModel); // Cache the movie in our database to improve robustness. Todo: temporary

            return movieModel;
        }

        public async Task<Movie> GetMovieByTitle(string title)
        {
            var movieModel = await _movieRespository.Find(x => x.Title.ToLower() == title.ToLower());

            if (movieModel != null) return movieModel;

            movieModel = await _thirdPartyMovieRepository.GetMovieByTitle(title);
            await AddMovie(movieModel); // Cache the movie in our database to improve robustness. Todo: temporary

            return movieModel;
        }

        public Task<SearchResultsModel> GetMoviesByTitle(string title)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> AddMovie(Movie movie)
        {
            if (movie == null) return false;

            var movieIsAdded = await _movieRespository.AddIfNotExists(movie, x => x.Id == movie.Id);

            if (!string.IsNullOrWhiteSpace(movie.Poster)) 
                await DownloadMoviePoster(movie);
            else
                Log.Information($"Invalid poster information for {movie.Id} - {movie.Title}");
            
            return movieIsAdded;
        }

        private async Task DownloadMoviePoster(Movie movie)
        {
            var folderPath = Path.Combine(_hostingEnvironment.WebRootPath, "assets\\posters");
            var fileName = movie.Id + Path.GetExtension(movie.Poster);
            var fileUploadPath = Path.Combine(folderPath, fileName);
            if (File.Exists(fileUploadPath))
            {
                Log.Information($"Poster {fileUploadPath} already exists in the assets folder.");
            }
            else
            {
                try
                {
                    Directory.CreateDirectory(folderPath);
                    using (var httpClient = new HttpClient())
                    using (var contentStream = await httpClient.GetStreamAsync(movie.Poster))
                    {
                        int bufferSize = 1048576;
                        using (var fileStream = new FileStream(fileUploadPath, FileMode.Create, FileAccess.Write,
                            FileShare.None, bufferSize, true))
                        {
                            await contentStream.CopyToAsync(fileStream);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(ex.Message);
                }

                if (File.Exists(fileUploadPath))
                    Log.Information($"Poster {fileUploadPath} is succesfully retrieved to the assets folder");
            }
        }

        public async Task<bool> MovieExistById(string movieId)
        {
            var countMatch = await _movieRespository.CountMatch(x => x.Id == movieId);
            return countMatch > 0;
        }
    }
}