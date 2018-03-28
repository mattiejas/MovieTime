import React from 'react';
import PropTypes from 'prop-types';

import styles from './MovieAttributes.scss';
import Icon from '../icon/Icon';

const MovieAttributes = props => (
  <ul className={styles['movie-attributes']}>
    <li><Icon type="star" /> <span>{props.rating} / 10</span></li>
    <li><Icon type="clock-o" /> <span>{props.time}m</span></li>
    <li><Icon type="film" /> <span>{props.genres}</span></li>
  </ul>
);

MovieAttributes.propTypes = {
  rating: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
};

export default MovieAttributes;
