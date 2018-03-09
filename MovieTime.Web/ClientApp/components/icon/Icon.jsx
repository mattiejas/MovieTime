import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Icon = ({ type }) => (
  <i className={cn('fa', `fa-${type}`)} />
);

Icon.propTypes = {
  // TODO: look into error
  // type: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Icon.defaultProps = {
  type: '',
};

export default Icon;
