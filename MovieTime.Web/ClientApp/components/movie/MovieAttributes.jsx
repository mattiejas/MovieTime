import React from 'react';
import PropTypes from 'prop-types';

import styles from './MovieAttributes.scss';
import Icon from '../icon/Icon';

function mapGenreList(genres) {
  if (genres instanceof Array) {
    return genres.join(', ');
  }
  return genres;
}

const MovieAttributes = props => (
  <ul className={styles['movie-attributes']}>
    <li><Icon type="star" /> <span>{props.rating} / 10</span></li>
    <li><Icon type="clock-o" /> <span>{props.time}m</span></li>
    <li><Icon type="film" /> <span>{mapGenreList(props.genres)}</span></li>
  </ul>
);

MovieAttributes.propTypes = {
  rating: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieAttributes;
