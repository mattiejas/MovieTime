import { getTokenAndRequestHeader } from '../utils/auth';

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
  return fetch(`/api/movie/title/${title}`)
    .then(response => response.json());
}
