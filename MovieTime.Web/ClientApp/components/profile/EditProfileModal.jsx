import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import { removeUser } from '../../utils/auth';
import { unauthenticate } from '../../modules/auth';

import LoginModal from '../modal/LoginModal';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import Input from '../input/Input';

import styles from './EditProfileModal.scss';

class EditProfileModal extends React.Component {
  state = {
    fieldErrors: {},
    user: {},
    loginRequired: false,
  };

  onChange(event, error) {
    const { name, value } = event.target;
    this.setState({
      fieldErrors: {
        ...this.state.fieldErrors,
        [name]: error,
      },
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

  onUpdate() {
    const values = Object.values(this.state.fieldErrors);
    if (!values.some(value => value !== null)) {
      this.props.onUpdate({ ...this.props.user, ...this.state.user });
      this.props.hideModal();
    }
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
        unauthenticate();
      })
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    const { hideModal } = this.props;
    const {
      firstName = this.props.user.firstName,
      lastName = this.props.user.lastName,
      email = this.props.user.email,
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
            <Input
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e, error) => this.onChange(e, error)}
              validate={value => (value.length <= 0 ? 'First Name is required' : null)}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e, error) => this.onChange(e, error)}
              validate={value => (value.length <= 0 ? 'Last Name is required' : null)}
            />
          </div>
          <div className={styles.group}>
            <Input
              label="E-mail"
              name="email"
              value={email}
              onChange={(e, error) => this.onChange(e, error)}
              validate={val => (isEmail(val) ? null : 'Email is invalid')}
            />
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
                onClick={() => this.onUpdate()}
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
