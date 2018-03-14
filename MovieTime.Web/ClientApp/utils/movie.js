
export function trackMovie(userId, movieId) {
  return fetch('/api/track/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId, userId }),
  });
}

export function getMovieByTitle(title) {
  return fetch(`/api/movie/title/${title}`)
    .then(response => response.json());
}
