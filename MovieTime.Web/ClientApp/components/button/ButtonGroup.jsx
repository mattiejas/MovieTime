import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import styles from './Button.scss';

const ButtonGroup = props => (
  <div className={styles.group}>
    {props.children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(Button).isRequired,
};

export default ButtonGroup;
