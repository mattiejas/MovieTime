import { getTokenAndRequestHeader } from '../utils/auth';
import betterFetch from './better-fetch';

export function trackMovie(movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => fetch('/api/track/', {
      method: 'post',
      headers: requestHeader,
      body: JSON.stringify({ movieId }),
    }));
}

export function untrackMovie(movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => fetch('/api/track/untrack', {
      method: 'post',
      headers: requestHeader,
      body: JSON.stringify({ movieId }),
    }));
}

export function isMovieTracked(userId, movieId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => fetch(`/api/track/user/${userId}/movie/${movieId}`, {
      method: 'get',
      headers: requestHeader,
    }))
    .then(response => response.json());
}

export function getMovieByTitle(title) {
  return fetch(`/api/movies/title/${title}`)
    .then(response => response.json());
}

export function getMovieById(id) {
  return betterFetch(`/api/movies/${id}`);
}

export function searchMovies(q) {
  return fetch(`/api/movies/search/${q}`)
    .then(response => response.json());
  // console.log(q);
  // return new Promise(resolve => resolve([
  //   'Thor',
  //   'Thor: Ragnarok',
  //   'Thor: The Dark World',
  // ]));
}
