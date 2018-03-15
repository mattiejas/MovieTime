import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Icon = ({ className, type }) => (
  <i className={cn('fa', `fa-${type}`, className)} />
);

Icon.propTypes = {
  // TODO: look into error
  // type: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  type: '',
};

export default Icon;
