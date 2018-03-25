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

export const getMovieByTitle = title =>
  betterFetch(`/api/movie/title/${title}`);
