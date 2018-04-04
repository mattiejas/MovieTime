import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from './Button';

import styles from './Button.scss';

const ButtonGroup = props => (
  <div className={cn(styles.group, props.className)}>
    {props.children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(Button).isRequired,
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {
  className: '',
};

export default ButtonGroup;
