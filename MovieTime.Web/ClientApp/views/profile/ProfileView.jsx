import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from '../../components/placeholder/Placeholder';
import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';

import styles from './ProfileView.scss';

const API = '/api/users/';

const EditProfileModal = props => (
  <Modal title="Edit Profile" hideModal={props.hideModal}>
    <div className={styles.edit}>
      <div className={styles.group}>
        <Input label="First Name" value={props.user.firstName} />
        <Input label="Last Name" value={props.user.lastName} />
      </div>
      <div className={styles.group}>
        <Input label="E-mail" value={props.user.email} />
      </div>
      <hr style={{ marginTop: '20px' }} />
      <div className={styles.group}>
        <Input label="Old Password" />
      </div>
      <div className={styles.group}>
        <Input label="New Password" />
        <Input label="Repeat Password" />
      </div>
      <hr style={{ marginTop: '20px' }} />
      <div className={styles.buttons}>
        <Button className={styles.button} danger onClick={props.hideModal}>Cancel</Button>
        <Button className={styles.button} dark>Update</Button>
      </div>
    </div>
  </Modal>
);

EditProfileModal.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

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
    fetch(API + id).then(response => response.json()).then((data) => {
      setTimeout(() => this.setState({
        user: data,
        isLoading: false,
      }), 200);
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
