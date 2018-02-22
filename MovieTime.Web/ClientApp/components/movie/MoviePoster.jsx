import React from 'react';
import PropTypes from 'prop-types';

const MoviePoster = props => (
  <div>
    <img src={props.source} alt={props.alt} />
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
