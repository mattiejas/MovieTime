import React from 'react';
import PropTypes from 'prop-types';

import styles from './MovieHeading.scss';

const MovieHeading = props => (
  <div className={styles['movie-heading']}>
    <h1 className={styles['movie-heading__title']}>{props.title}</h1>
    <span className={styles['movie-heading__year']}>{props.year}</span>
  </div>
);

MovieHeading.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default MovieHeading;
