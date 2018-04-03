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
  return fetch(`/api/movies/search/${q}`)
    .then(response => response.json());
  // console.log(q);
  // return new Promise(resolve => resolve([
  //   'Thor',
  //   'Thor: Ragnarok',
  //   'Thor: The Dark World',
  // ]));
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
