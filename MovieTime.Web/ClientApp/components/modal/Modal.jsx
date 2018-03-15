import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Modal.scss';

class Modal extends React.Component {
  componentDidMount() {
    if (!this.props.hidden) {
      this.modal.focus();
    }
  }

  onKeyPress(e) {
    e.stopPropagation();
    // Escape
    if (e.keyCode === 27) {
      this.props.hideModal();
    }
  }

  render() {
    if (this.props.hidden) {
      // enable background scrolling
      document.getElementsByTagName('body')[0].removeAttribute('class');
    } else {
      // disable background scrolling
      document.getElementsByTagName('body')[0].setAttribute('class', 'no-scroll');
    }

    if (this.props.hidden) {
      return null;
    }

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
          className={cn(styles.modal, this.props.className)}
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
  hidden: PropTypes.bool,
  className: PropTypes.string,
};

Modal.defaultProps = {
  title: undefined,
  hidden: false,
  className: '',
};

export default Modal;
