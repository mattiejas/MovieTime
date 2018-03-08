import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.scss';

const Input = ({ label, value }) => (
  <div className={styles.wrapper}>
    {
      label &&
      <span className={styles.label}>{label}</span>
    }
    <input className={styles.input} value={value} />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  label: undefined,
  value: '',
};

export default Input;
