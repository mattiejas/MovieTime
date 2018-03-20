import React from 'react';
import PropTypes from 'prop-types';

import styles from './Spinner.scss';

const Spinner = ({ className, hidden }) => (
  <div className={className}>
    {
      !hidden &&
      <div className={styles.loader}>Loading...</div>
    }
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
};

Spinner.defaultProps = {
  className: '',
  hidden: false,
};

export default Spinner;
