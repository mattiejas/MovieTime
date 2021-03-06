import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Button.scss';
import Icon from '../icon/Icon';

const Button = ({
  to, toState, dark, danger, className, children, icon, ...rest
}) => {
  if (to || toState) {
    return (
      <Link
        className={cn(styles.button, dark ? styles.dark : '', danger ? styles.danger : '', className)}
        to={to || toState}
        href={to || toState.pathname}
        {...rest}
      >
        <div className={styles.button__inner}>
          {
            icon !== '' &&
            <Icon type={icon} />
          }
          <span className={children !== '' && icon !== '' ? styles.spacing : ''} />{children}
        </div>
      </Link>
    );
  }
  return (
    <button
      // role="button"
      className={cn(styles.button, dark ? styles.dark : '', danger ? styles.danger : '', className)}
      tabIndex={0}
      {...rest}
    >
      <div className={styles.button__inner}>
        {
          icon !== '' &&
          <Icon type={icon} />
        }
        <span className={children !== '' && icon !== '' ? styles.spacing : ''} />{children}
      </div>
    </button>
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
  toState: PropTypes.objectOf(PropTypes.any),
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
  toState: undefined,
};

export default Button;
