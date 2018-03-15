import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Icon.scss';

const Icon = ({ type, onClick, className }) => {
  if (onClick) {
    return (
      <i role="button" tabIndex="0" className={cn('fa', `fa-${type}`, styles.icon, className)} onClick={onClick} onKeyPress={onClick} />
    );
  }
  return (
    <i className={cn('fa', `fa-${type}`)} />
  );
};

Icon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  // TODO: look into error
  // type: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  className: '',
  type: '',
  onClick: undefined,
};

export default Icon;
