import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.scss';

const Input = ({
  label,
  value,
  onChange,
  readOnly,
  ...rest
}) => (
  <div className={styles.wrapper}>
    {
      label &&
      <span className={styles.label}>{label}</span>
    }
    <input
      readOnly={readOnly}
      className={styles.input}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: undefined,
  value: '',
  readOnly: false,
  onChange: undefined,
};

export default Input;
