import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.scss';

const Input = props => (
  <div className={styles.wrapper}>
    {
      props.label &&
      <span className={styles.label}>{props.label}</span>
    }
    <input className={styles.input} />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
};

Input.defaultProps = {
  label: undefined,
};

export default Input;
