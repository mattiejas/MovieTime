import React from 'react';
import PropTypes from 'prop-types';

import { removeUser, logout } from '../../utils/auth';

import LoginModal from '../modal/LoginModal';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Input from '../input/Input';

import styles from './EditProfileModal.scss';

class EditProfileModal extends React.Component {
  state = {
    user: {},
    loginRequired: false,
  };

  onChange(event) {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  }

  onLoginSucceeded(email, password) {
    this.toggleLogin();
    this.removeUser(email, password);
  }

  toggleLogin() {
    this.setState({
      loginRequired: !this.state.loginRequired,
    });
  }

  removeUser(email, password) {
    removeUser(email, password)
      .then(() => {
        this.props.hideModal();
        logout();
      })
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    const { hideModal, onUpdate } = this.props;
    const {
      firstName = this.props.user.firstName,
      lastName = this.props.user.lastName,
      email = this.props.user.email,
      'old-password': oldPassword,
      'new-password': newPassword,
      'repeat-password': repeatPassword,
    } = this.state.user;

    if (this.props.hidden) {
      return null;
    }

    return (
      <Modal title="Edit Profile" hideModal={hideModal}>
        <LoginModal
          hidden={!this.state.loginRequired}
          email={this.props.user.email}
          onDiscard={() => this.toggleLogin()}
          onSuccess={(e, pw) => this.onLoginSucceeded(e, pw)}
        />
        <div className={styles.edit}>
          <span className={styles.error}>{this.state.error}</span>
          <div className={styles.group}>
            <Input label="First Name" name="firstName" value={firstName} onChange={e => this.onChange(e)} />
            <Input label="Last Name" name="lastName" value={lastName} onChange={e => this.onChange(e)} />
          </div>
          <div className={styles.group}>
            <Input label="E-mail" name="email" value={email} onChange={e => this.onChange(e)} />
          </div>
          <hr style={{ marginTop: '20px' }} />
          <div className={styles.group}>
            <Input label="Old Password" name="old-password" type="password" value={oldPassword} onChange={e => this.onChange(e)} />
          </div>
          <div className={styles.group}>
            <Input label="New Password" name="new-password" type="password" value={newPassword} onChange={e => this.onChange(e)} />
            <Input label="Repeat Password" name="repeat-password" type="password" value={repeatPassword} onChange={e => this.onChange(e)} />
          </div>
          <hr style={{ marginTop: '20px' }} />
          <div className={styles.buttons}>
            <div>
              <Button danger onClick={() => this.toggleLogin()} dark>Delete Me</Button>
            </div>
            <div>
              <Button className={styles.button} onClick={hideModal}>Cancel</Button>
              <Button
                dark
                className={styles.button}
                onClick={() => {
                  onUpdate({ ...this.props.user, ...this.state.user }); hideModal();
                }}
              >
                Update
              </Button>
            </div>
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
  hidden: PropTypes.bool,
};

EditProfileModal.defaultProps = {
  hidden: false,
};

export default EditProfileModal;
