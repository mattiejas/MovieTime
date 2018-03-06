import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Placeholder.scss';

const Placeholder = ({
  isReady,
  children,
  className,
  width,
  height,
}) => {
  const style = {};
  if (width) style.width = `${width}px`;
  if (height) style.height = `${height}px`;

  return (
    <div className={cn(styles.placeholder, isReady ? styles.ready : '')} style={!isReady ? style : {}}>
      <div className={cn(styles.placeholder__children, isReady ? styles.ready : '', className)}>
        {children}
      </div>
    </div>
  );
};

Placeholder.propTypes = {
  isReady: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Placeholder.defaultProps = {
  isReady: false,
  className: '',
  width: undefined,
  height: undefined,
};

export default Placeholder;
