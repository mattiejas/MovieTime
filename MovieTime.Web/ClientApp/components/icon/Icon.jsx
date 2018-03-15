import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Icon.scss';

const Icon = ({ type, onClick }) => {
  if (onClick) {
    return (
      <i role="button" tabIndex="0" className={cn('fa', `fa-${type}`, styles.icon)} onClick={onClick} onKeyPress={onClick} />
    );
  }
  return (
    <i className={cn('fa', `fa-${type}`)} />
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  onClick: undefined,
};

export default Icon;
