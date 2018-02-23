import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.scss';
import Icon from '../icon/Icon';

const Button = props => (
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
    <div className={styles.button__inner}>
      {
        props.icon !== '' &&
        <Icon type={props.icon} />
      }
      {props.children}
    </div>
  </div>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
};

Button.defaultProps = {
  icon: '',
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  onKeyPress: () => {},
};

export default Button;
