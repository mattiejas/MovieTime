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
    .then(requestHeader => betterFetch(`/api/tracked/movie/${movieId}`, {
      method: 'get',
      headers: requestHeader,
    }))
    .then(response => ({ ...response, id: movieId }));
}

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

export const searchMovies = (q, page = 1) =>
  betterFetch(`/api/movies/search/${q}/page/${page}`);

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

export const getMovieByTitle = title =>
  betterFetch(`/api/movie/title/${title}`);

export const getTrendingMovies = count =>
  betterFetch(`/api/movie/trending/${count}`);

export const getRecentlyTrackedMovies = count =>
  betterFetch(`/api/movie/trending/tracked/${count}`);
