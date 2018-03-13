import React from 'react';
import PropTypes from 'prop-types';

import ListWidget from '../../components/list-widget/ListWidget';
import Placeholder from '../../components/placeholder/Placeholder';
import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';

import styles from './ProfileView.scss';

const API = '/api/users/';

class EditProfileModal extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }
  onChange(event) {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  }
  render() {
    const { hideModal, onUpdate } = this.props;
    const {
      firstName = this.props.user.firstName,
      lastName = this.props.user.lastName,
      email = this.props.user.email,
    } = this.state.user;
    return (
      <Modal title="Edit Profile" hideModal={hideModal}>
        <div className={styles.edit}>
          <div className={styles.group}>
            <Input label="First Name" name="firstName" value={firstName} onChange={e => this.onChange(e)} />
            <Input label="Last Name" name="lastName" value={lastName} onChange={e => this.onChange(e)} />
          </div>
          <div className={styles.group}>
            <Input label="E-mail" name="email" value={email} onChange={e => this.onChange(e)} />
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
            <Button danger className={styles.button} onClick={hideModal}>Cancel</Button>
            <Button
              dark
              className={styles.button}
              onClick={() => { onUpdate({ ...this.props.user, ...this.state.user }); hideModal(); }}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

EditProfileModal.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  hideModal: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
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
    }).then(response => response)
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
            <ListWidget movies={['Thor: Ragnarok', 'Thor: Ragnarok']} history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

ProfileView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileView;
