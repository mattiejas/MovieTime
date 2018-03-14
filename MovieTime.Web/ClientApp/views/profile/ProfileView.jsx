import React from 'react';
import PropTypes from 'prop-types';
import { getUserData, updateUserData } from '../../utils/user';


import ListWidget from '../../components/list-widget/ListWidget';
import Placeholder from '../../components/placeholder/Placeholder';
import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';


import styles from './ProfileView.scss';


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
    const { hideModal, onUpdate, hidden } = this.props;
    const {
      firstName = this.props.user.firstName,
      lastName = this.props.user.lastName,
      email = this.props.user.email,
    } = this.state.user;

    if (hidden) {
      return null;
    }

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
  hidden: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  hideModal: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

EditProfileModal.defaultProps = {
  hidden: false,
};

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
      isEditing: false,
      movies: ['Thor: Ragnarok', 'Thor', 'Black Panther', 'Spider-Man: Homecoming', 'Thor: Ragnarok'],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getUserData(id).then((data) => {
      this.setState({
        user: { id, ...data },
        isLoading: false,
      });
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
    const { firstName = '', lastName = '' } = this.state.user;
    const { id } = this.props.match.params;
    return (
      <div className={styles.view}>
        <EditProfileModal
          hidden={!this.state.isEditing}
          hideModal={() => this.onDiscard()}
          onUpdate={user => updateUserData(user).then(() => {
              getUserData(user.id);
          })}
          user={this.state.user}
        />
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
            <ListWidget title="Wants to watch" movies={this.state.movies} history={this.props.history} />
            <ListWidget title="Has watched" movies={this.state.movies} history={this.props.history} />
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
