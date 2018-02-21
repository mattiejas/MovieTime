import React from 'react';
import PropTypes from 'prop-types';

export const Button = props => <div>{props.children}</div>;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
