import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Text.scss';

const Text = ({
  children,
  className,
  onChange,
  ...props
}) => (
  <textarea
    className={cn(styles.text, className)}
    onChange={e => onChange(e.target.value)}
    rows={3}
    value={children}
    {...props}
  />
);

Text.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
};

export default Text;
