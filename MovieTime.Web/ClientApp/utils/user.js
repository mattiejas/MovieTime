import betterFetch from './better-fetch';
import { getTokenAndRequestHeader } from './auth';

const API = '/api/users/';

export function getUserData(id) {
  return betterFetch(API + id);
}

export const updateUserData = user =>
  getTokenAndRequestHeader()
    .then(requestHeader => betterFetch(API + user.id, {
      headers: requestHeader,
      method: 'PUT',
      body: JSON.stringify(user),
    }));
