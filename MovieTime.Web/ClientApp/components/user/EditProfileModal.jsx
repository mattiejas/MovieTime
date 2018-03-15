import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/Button';
import Modal from '../modal/Modal';
import Input from '../input/Input';

import styles from './EditProfileModal.scss';

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
      'old-password': oldPassword,
      'new-password': newPassword,
      'repeat-password': repeatPassword,
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
            <Input label="Old Password" name="old-password" type="password" value={oldPassword} onChange={e => this.onChange(e)} />
          </div>
          <div className={styles.group}>
            <Input label="New Password" name="new-password" type="password" value={newPassword} onChange={e => this.onChange(e)} />
            <Input label="Repeat Password" name="repeat-password" type="password" value={repeatPassword} onChange={e => this.onChange(e)} />
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

export default EditProfileModal;
