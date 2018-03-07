import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';

import styles from './ProfileView.scss';
import Modal from "../../components/modal/Modal";

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isEditing: false,
    };
  }

  fetchUserData(id) {
    this.setState({
      user: id, // some API call
    });
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

  render() {
    const {id} = this.props.match.params;
    return (
      <div className={styles.view}>
        {
          this.state.isEditing &&
            <Modal title="Edit Profile" hideModal={() => this.onDiscard()}>
              Pls edit me.
            </Modal>
        }
        <div className={styles.view__background} />
        <div className={styles.view__header}>
          <div className={styles.header}>
            <div className={styles.header__picture}>
              <ProfilePicture className={styles.picture} source="/assets/tobey.jpg" />
            </div>
            <div className={styles.header__content}>
              <div className={styles.name}>
                <h1>Peter Parker</h1>
                <h3>has watched 42 movies worthy of 66 hours and 420 minutes.</h3>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus architecto, deleniti dolorem earum excepturi explicabo labore nostrum nulla porro qui quo rem similique tempora veniam vero vitae! Aut, optio.
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
