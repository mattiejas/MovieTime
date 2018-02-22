import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const Icon = ({ type }) => (
  <i className={cn('fa', `fa-${type}`)} />
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Icon;
