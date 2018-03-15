import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from '../../components/placeholder/Placeholder';
import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';
import EditProfileModal from '../../components/user/EditProfileModal';

import styles from './ProfileView.scss';

const API = '/api/users/';

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
      isEditing: false,
    };
  }

  componentDidMount() {
    this.fetchUserData(this.props.match.params.id);
  }

  onEdit() {
    this.setState({
      isEditing: true,
    });
  }

  onDiscard() {
    this.setState({
      isEditing: false,
    });
  }

  fetchUserData(id) {
    fetch(API + id)
      .then(response => response.json())
      .then((data) => {
        setTimeout(() => this.setState({
          user: { id, ...data },
          isLoading: false,
        }), 200);
      });
  }

  updateUserData(user) {
    fetch(API, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(user),
    })
      .then(response => response)
      .then(() => {
        this.fetchUserData(user.id);
      });
  }

  render() {
    const { firstName = '', lastName = '' } = this.state.user;
    const { id } = this.props.match.params;
    return (
      <div className={styles.view}>
        {
          this.state.isEditing &&
          <EditProfileModal
            hideModal={() => this.onDiscard()}
            onUpdate={user => this.updateUserData(user)}
            user={this.state.user}
          />
        }
        <div className={styles.view__background} />
        <div className={styles.view__header}>
          <div className={styles.header}>
            <div className={styles.header__picture}>
              <ProfilePicture className={styles.picture} source={`/assets/users/${id}.png`} />
            </div>
            <div className={styles.header__content}>
              <div className={styles.name}>
                <Placeholder isReady={!this.state.isLoading}>
                  <h1>{`${firstName} ${lastName}`}</h1>
                  <h3>has watched 42 movies worthy of 66 hours and 420 minutes</h3>
                </Placeholder>
              </div>
            </div>
          </div>
          <div className={styles.buttons__container}>
            <div className={styles.buttons}>
              <Button dark icon="pencil" onClick={() => this.onEdit()}>Edit</Button>
              <Button dark icon="user">Follow</Button>
            </div>
          </div>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus architecto, deleniti dolorem earum
            excepturi explicabo labore nostrum nulla porro qui quo rem similique tempora veniam vero vitae! Aut, optio.
          </div>
        </div>
      </div>
    );
  }
}

ProfileView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileView;
