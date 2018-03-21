import betterFetch from './better-fetch';
import { getTokenAndRequestHeader } from './auth';

const usersAPI = '/api/users/';

export function getUserData(id) {
  return betterFetch(usersAPI + id);
}

export function updateUserData(user, id) {
  const updateUserDto = {
    ...user,
    id,
  };

  return getTokenAndRequestHeader()
    .then(requestHeader => fetch(usersAPI + id, {
      headers: requestHeader,
      method: 'PUT',
      body: JSON.stringify(updateUserDto),
    }).then(response => response));
}

