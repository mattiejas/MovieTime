export function trackMovie(userId, movieId) {
  return fetch('/api/track/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, movieId }),
  });
}

export function untrackMovie(userId, movieId) {
  return fetch('/api/track/untrack', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, movieId }),
  });
}

export function isMovieTracked(userId, movieId) {
  return fetch(`/api/track/user/${userId}/movie/${movieId}`)
    .then(response => response.json());
}

export function getMovieByTitle(title) {
  return fetch(`/api/movie/title/${title}`)
    .then(response => response.json());
}
