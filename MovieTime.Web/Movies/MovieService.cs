using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Genres;
using MovieTime.Web.Genres.GenreModels;
using MovieTime.Web.Genres.MovieGenreModels;
using MovieTime.Web.Movies.Models;
using MovieTime.Web.ThirdPartyServices;
using MovieTime.Web.ThirdPartyServices.OMDB.MovieList;
using MovieTime.Web.TrackedMovies;
using Serilog;

namespace MovieTime.Web.Movies
{
    public class MovieService : IMovieService
    {
        private readonly IThirdPartyMovieRepository _thirdPartyMovieRepository;
        private readonly IMovieRespository _movieRespository;
        private readonly IGenreRepository _genreRepository;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ITrackRepository _trackRepository;
        private readonly IMapper _mapper;

        public MovieService(IThirdPartyMovieRepository thirdPartyMovieRepository,
            IMovieRespository databaseMovieRespository, IHostingEnvironment hostingEnvironment,
            IGenreRepository genreRepository, ITrackRepository trackRepository, IMapper mapper)
        {
            _thirdPartyMovieRepository = thirdPartyMovieRepository;
            _movieRespository = databaseMovieRespository;
            _genreRepository = genreRepository;
            _mapper = mapper;
            _trackRepository = trackRepository;
            _hostingEnvironment = hostingEnvironment;
        }

        /**
         * Get the movie with the given id.
         * The business rule is to give internal database higher priority than third party databases.
         * If the movie doesn't exist in internal database, get it from third party database.
         */
        public async Task<Movie> GetMovieById(string id, bool save = true)
        {
            var movieModel = await _movieRespository.GetMovieWithGenre(x => x.Id == id);
            if (movieModel != null)
            {
                movieModel.Poster = await DownloadMoviePoster(movieModel);
                return movieModel;
            }

            movieModel = await _thirdPartyMovieRepository.GetMovieById(id);
            
            await AddMovie(movieModel);

            return movieModel;
        }

        public async Task<Movie> GetMovieByTitle(string title)
        {
            var movieModel = await _movieRespository.GetMovieWithGenre(x => x.Title.ToLower() == title.ToLower());
            if (movieModel != null)
            {
                movieModel.Poster = await DownloadMoviePoster(movieModel);
                return movieModel;
            }

            movieModel = await _thirdPartyMovieRepository.GetMovieByTitle(title);
            if (movieModel != null) movieModel.Poster = await DownloadMoviePoster(movieModel);

            await AddMovie(movieModel);

            return movieModel;
        }

        public async Task<List<ShortMovieDto>> GetMoviesByTitle(string title, int page = 1)
        {
            var searchResultsModel = await _thirdPartyMovieRepository.GetMoviesByTitle(title, page);
            var shortMovieDtos = _mapper.Map<List<ShortMovieModel>, List<ShortMovieDto>>(searchResultsModel.Movies);

            return shortMovieDtos;
        }

        private async Task<ICollection<MovieGenre>> AddGenres(Movie movie)
        {
            var genreIdList = movie.Genres.Select(genre => genre.DbGenreId).ToList();
            var genres = new List<Genre>();

            foreach (var genreId in genreIdList)
            {
                var genre = await _genreRepository.Find(x => x.Name == genreId);
                if (genre == null)
                {
                    genre = new Genre()
                    {
                        Name = genreId,
                    };
                    await _genreRepository.Add(genre);
                }

                genres.Add(genre);
            }

            var movieGenres = new List<MovieGenre>();
            foreach (var genre in genres)
            {
                movieGenres.Add(new MovieGenre()
                {
                    Movie = movie,
                    Genre = genre
                });
            }

            return movieGenres;
        }

        public async Task<bool> AddMovie(Movie movie, bool save = true)
        {
            if (movie == null) return false;

            movie.Poster = await DownloadMoviePoster(movie);
            movie.Genres = await AddGenres(movie);

            if (save) return await _movieRespository.AddIfNotExists(movie, x => x.Id == movie.Id);
            return true;
        }

        private async Task<string> DownloadMoviePoster(Movie movie)
        {
            if (string.IsNullOrWhiteSpace(movie.Poster))
            {
                Log.Information($"Invalid poster information for {movie.Id} - {movie.Title}");
                return movie.Poster;
            }

            var folderPath = Path.Combine("assets", "posters");
            var fileName = movie.Id + Path.GetExtension(movie.Poster);
            var posterLocation = Path.Combine(folderPath, fileName);

            var fileUploadPath = Path.Combine(_hostingEnvironment.WebRootPath, posterLocation);

            if (File.Exists(fileUploadPath))
            {
                Log.Information($"Poster {fileUploadPath} already exists in the assets folder.");
                return posterLocation;
            }

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
            {
                Log.Information($"Poster {fileUploadPath} is succesfully retrieved to the assets folder");
                return posterLocation;
            }

            return movie.Poster;
        }

        public async Task<bool> MovieExistById(string movieId)
        {
            var countMatch = await _movieRespository.CountMatch(x => x.Id == movieId);
            return countMatch > 0;
        }

        public async Task<ICollection<Movie>> GetTrendingMovies(int count)
        {
            var trending = await _trackRepository.GetDbSet()
                .GroupBy(x => new
                {
                    x.MovieId,
                    x.Movie
                })
                .Select(y => new
                {
                    y.Key,
                    Count = y.Count()
                })
                .OrderByDescending(z => z.Count)
                .Select(m => m.Key.Movie)
                .Take(count)
                .ToListAsync();

            return trending;
        }

        public async Task<ICollection<Movie>> GetRecentTrackedMovies(int count)
        {
            var trending = await _trackRepository.GetDbSet()
                .OrderByDescending(z => z.CreatedTime)
                .Select(m => m.Movie)
                .Take(count)
                .ToListAsync();

            return trending;
        }
    }
}