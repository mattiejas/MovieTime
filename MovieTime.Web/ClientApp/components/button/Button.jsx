import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Button.scss';
import Icon from '../icon/Icon';

const Button = props => (
  <div
    role="button"
    className={cn(styles.button, props.dark ? styles.dark : '', props.danger ? styles.danger : '', props.className)}
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
      <span className={props.children !== '' && props.icon !== '' ? styles.spacing : ''} />{props.children}
    </div>
  </div>
);

Button.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  dark: PropTypes.bool,
  danger: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: '',
  icon: '',
  onClick: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  onKeyPress: () => {},
  dark: false,
  danger: false,
  className: '',
};

export default Button;
