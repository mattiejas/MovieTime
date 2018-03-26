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
