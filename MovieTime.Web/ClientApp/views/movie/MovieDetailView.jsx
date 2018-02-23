import React from 'react';

import MoviePoster from '../../components/movie/MoviePoster';
import MovieHeading from '../../components/movie/MovieHeading';
import MovieAttributes from '../../components/movie/MovieAttributes';

import styles from './MovieDetailView.scss';

const MovieDetailView = () => (
  <div className={styles.view}>
    <div className={styles.view__background} />
    <div className={styles.view__content}>
      <div className="container">
        <MovieHeading title="Een super lange film" year="2017" />
        <MoviePoster source="https://cdn.movieweb.com/img.teasers.posters/FIepTjimwgwohi_360_a/Thor.jpg" alt="Alt text" />
        <MovieAttributes ranking="6" time="1h 2m 6s" genres="Action, Adventure, Comedy" />
        <ul>
          <li><b>Director:</b> Taika Waititi</li>
          <li><b>Writers:</b> Eric Pearson, Craig Kyle</li>
          <li><b>Actors:</b> Chris Hemsworth, Tom Hiddleston, Cate Blanchett</li>
        </ul>
        <p>
          Thor is imprisoned on the other side of the universe and finds himself
          in a race against time to get back to Asgard to stop Ragnarok,
          the destruction of his homeworld and the end of Asgardian civilization,
          at the hands of an all-powerful new threat, the ruthless Hela.
        </p>
      </div>
    </div>
  </div>
);

export default MovieDetailView;
