import betterFetch from './better-fetch';
import { getTokenAndRequestHeader } from './auth';

const API = '/api/users/';

export function getUserData(id) {
  return betterFetch(API + id);
}

export function getTrackedMoviesByUser(userId) {
  return getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(`/api/tracks/user/${userId}`, {
      headers: requestHeader,
      method: 'GET',
    }));
}

export const updateUserData = user =>
  getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(API + user.id, {
      headers: requestHeader,
      method: 'PUT',
      body: JSON.stringify(user),
    }));

export function downloadUserData() {
  return getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(`${API}info`, {
      headers: requestHeader,
      method: 'GET',
    }));
}

