import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './ProfilePicture.scss';

class ProfilePicture extends React.Component {
  state = {
    source: this.props.source,
  };

  onError() {
    this.setState({
      source: '/assets/users/fallback.png',
    });
  }

  render() {
    return (
      <div className={cn(styles.profile_picture, this.props.className)}>
        <img className="image" src={this.state.source} alt="user" onError={() => this.onError()} />
      </div>
    );
  }
}

ProfilePicture.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
};

ProfilePicture.defaultProps = {
  source: '',
  className: '',
};

export default ProfilePicture;
