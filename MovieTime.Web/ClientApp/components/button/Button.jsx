import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss';

export const Button = props => (
  <div
    role="button"
    className={styles.button}
    tabIndex={0}
    onFocus={props.onFocus}
    onClick={props.onClick}
    onKeyDown={props.onKeyDown}
    onKeyPress={props.onKeyPress}
    onKeyUp={props.onKeyUp}
  >
    {props.children}
  </div>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
};

Button.defaultProps = {
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  onKeyPress: () => {},
};

export default Button;
