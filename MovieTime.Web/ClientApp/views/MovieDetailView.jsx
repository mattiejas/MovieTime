import React from 'react';
import MoviePoster from '../components/movie/MoviePoster';
import MovieHeading from '../components/movie/MovieHeading';

const MovieDetailView = () => (
  <div>
    <MoviePoster source="https://cdn.movieweb.com/img.teasers.posters/FIepTjimwgwohi_360_a/Thor.jpg" alt="Alt text" />
    <MovieHeading title="Thor: Ragnarok" year="2017" />
  </div>
);

export default MovieDetailView;
