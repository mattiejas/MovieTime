import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Button.scss';
import Icon from '../icon/Icon';

const Button = (props) => {
  if (props.to) {
    return (
      <Link
        className={cn(styles.button, props.dark ? styles.dark : '', props.danger ? styles.danger : '', props.className)}
        to={props.to}
        href={props.to}
      >
        <div className={styles.button__inner}>
          {
            props.icon !== '' &&
            <Icon type={props.icon} />
          }
          <span className={props.children !== '' && props.icon !== '' ? styles.spacing : ''} />{props.children}
        </div>
      </Link>
    );
  }
  return (
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
};

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
  to: PropTypes.string,
};

Button.defaultProps = {
  children: '',
  icon: '',
  onClick: undefined,
  onFocus: undefined,
  onKeyDown: undefined,
  onKeyUp: undefined,
  onKeyPress: undefined,
  dark: false,
  danger: false,
  className: '',
  to: undefined,
};

export default Button;
