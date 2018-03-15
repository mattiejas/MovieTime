const usersAPI = '/api/users/';

export function getUserData(id) {
  return fetch(usersAPI + id).then(response => response.json());
}

export function updateUserData(user) {
  return fetch(usersAPI, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(user),
  }).then(response => response);
}

