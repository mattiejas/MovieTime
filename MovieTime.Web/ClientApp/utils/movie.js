import { getTokenAndRequestHeader } from '../utils/auth';
import betterFetch from './better-fetch';

export function trackMovie(movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => fetch(`/api/tracks/movie/${movieId}`, {
      method: 'post',
      headers: requestHeader,
    }));
}

export function untrackMovie(movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => fetch(`/api/untrack/movie/${movieId}`, {
      method: 'post',
      headers: requestHeader,
    }));
}

export function isMovieTracked(userId, movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => fetch(`/api/tracked/movie/${movieId}`, {
      method: 'get',
      headers: requestHeader,
    }))
    .then(response => response.json());
}

export const getMovieByTitle = title =>
  betterFetch(`/api/movie/title/${title}`);

export function getCommentsOnMovie(movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(`/api/comments/movie/${movieId}`, {
      method: 'get',
      headers: requestHeader,
    }));
}

export function getMovieById(id) {
  return betterFetch(`/api/movies/${id}`);
}

export function searchMovies(q) {
  // return fetch(`/api/movies/search/${q}`).then(response => response.json());
  return new Promise(resolve =>
    resolve([
      {
        id: 'tt0145487',
        title: 'Spider-Man',
        year: '2002',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0948470',
        title: 'The Amazing Spider-Man',
        year: '2012',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0316654',
        title: 'Spider-Man 2',
        year: '2004',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0413300',
        title: 'Spider-Man 3',
        year: '2007',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt1872181',
        title: 'The Amazing Spider-Man 2',
        year: '2014',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt2250912',
        title: 'Spider-Man: Homecoming',
        year: '2017',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0331527',
        title: 'Jack Black: Spider-Man',
        year: '2002',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0078308',
        title: 'Spider-Man Strikes Back',
        year: '1978',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0077328',
        title: "Spider-Man: The Dragon's Challenge",
        year: '1979',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
      {
        id: 'tt0211194',
        title: 'The Amazing Adventures of Spider-Man',
        year: '1999',
        genre: 'movie',
        rating: null,
        runTimeInMinutes: 0,
      },
    ]));
}

export function getCommentsByUser(userId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(`/api/comments/user/${userId}`, {
      method: 'get',
      headers: requestHeader,
    }));
}

export function postCommentOnMovie(movieId, comment) {
  return getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(`/api/comments/movie/${movieId}`, {
      method: 'post',
      headers: requestHeader,
      body: JSON.stringify({
        value: comment,
      }),
    }));
}

export function toggleWatchStatus(movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(`/api/watch/movie/${movieId}`, {
      method: 'post',
      headers: requestHeader,
    }));
}
