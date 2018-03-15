import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';

import styles from './LoginModal.scss';

class LoginModal extends React.Component {
  onSuccess() {
    this.props.onSuccess();
  }

  onFailure() {
    this.props.onFailure();
  }

  render() {
    return (
      <Modal className={styles.login} hidden={this.props.hidden} title="Login to confirm" hideModal={() => this.onFailure()}>
        Blabla
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  hidden: PropTypes.bool,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

LoginModal.defaultProps = {
  hidden: false,
};

export default LoginModal;
