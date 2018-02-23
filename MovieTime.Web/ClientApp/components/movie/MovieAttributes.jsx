import React from 'react';
import PropTypes from 'prop-types';

import styles from './MovieAttributes.scss';
import Icon from '../icon/Icon';

const MovieAttributes = props => (
  <ul className={styles['movie-attributes']}>
    <li><Icon type="star" /> <span>{props.ranking} / 10</span></li>
    <li><Icon type="clock-o" /> <span>{props.time}</span></li>
    <li><Icon type="film" /> <span>{props.genres}</span></li>
  </ul>
);

MovieAttributes.propTypes = {
  ranking: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieAttributes;
