import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/Button';

import styles from './SpoilerWarning.scss';

const SpoilerWarning = ({ hidden, onClick }) => {
  if (hidden) return null;
  return (
    <div className={styles.spoiler}>
      <h4>Recent Comments</h4>
      <div className={styles.spoiler__container}>
        <p>Comments might contain spoilers! Do you want to see them?</p>
        <div className={styles.button}>
          <Button dark onClick={() => onClick()}>I&#39;m aware!</Button>
        </div>
      </div>
    </div>
  );
};

SpoilerWarning.propTypes = {
  onClick: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

SpoilerWarning.defaultProps = {
  hidden: false,
};

export default SpoilerWarning;
