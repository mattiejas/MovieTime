import React from 'react';
import PropTypes from 'prop-types';

import styles from './MoviePoster.scss';

const MoviePoster = props => (
  <div className={styles['movie-poster']}>
    <img className="image" src={props.source} alt={props.alt} />
  </div>
);

MoviePoster.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

MoviePoster.defaultProps = {
  alt: '',
};

export default MoviePoster;
