import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.scss';

class Modal extends React.Component {
  componentDidMount() {
    this.modal.focus();
  }

  onKeyPress(e) {
    e.stopPropagation();
    // Escape
    if (e.keyCode === 27) {
      this.props.hideModal();
    }
  }

  render() {
    return (
      <div
        className={styles.modal__background}
        tabIndex={0}
        role="button"
        onKeyDown={e => this.onKeyPress(e)}
        onClick={() => this.props.hideModal()}
      >
        <div
          ref={(modal) => { this.modal = modal; }}
          className={styles.modal}
          role="button"
          tabIndex={0}
          onKeyDown={e => this.onKeyPress(e)}
          onClick={e => e.stopPropagation()}
        >
          {
            this.props.title &&
            <div>
              <h1>{this.props.title}</h1>
              <hr />
            </div>
          }
          <div className={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hideModal: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: undefined,
};

export default Modal;
