import React from 'react';
import MoviePoster from '../../components/movie/MoviePoster';
import MovieHeading from '../../components/movie/MovieHeading';

import styles from './MovieDetailView.scss';

const MovieDetailView = () => (
  <div className={styles.view}>
    <div className={styles.view__background} />
    <div className={styles.view__content}>
      <MoviePoster source="https://cdn.movieweb.com/img.teasers.posters/FIepTjimwgwohi_360_a/Thor.jpg" alt="Alt text" />
      <MovieHeading title="Thor: Ragnarok" year="2017" />
    </div>
  </div>
);

export default MovieDetailView;
