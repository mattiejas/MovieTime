import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './ProfilePicture.scss';

const ProfilePicture = ({ source, className }) => (
  <div className={cn(styles.profile_picture, className)}>
    <img className="image" src={source} alt="user" />
  </div>
);

ProfilePicture.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
};

ProfilePicture.defaultProps = {
  source: '',
  className: '',
};

export default ProfilePicture;
