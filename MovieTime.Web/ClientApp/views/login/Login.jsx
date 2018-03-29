import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticate, authenticateWithGoogle } from '../../modules/auth';
import auth from '../../firebase';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import styles from './Login.scss';
import ButtonGroup from '../../components/button/ButtonGroup';
import Icon from '../../components/icon/Icon';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignInWithGoogle = this.handleSignInWithGoogle.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.authenticate(this.state.email, this.state.password).catch((err) => {
      this.setState({ error: err.message });
    });
  }

  handleSignInWithGoogle(event) {
    event.preventDefault();
    auth.onAuthStateChanged((user) => {
      this.props.authenticateWithGoogle(user);
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles['view__content--wrapper']}>
          <div className={styles.view__content}>
            {this.props.location.state && this.props.location.state.afterRegister ? <h1>Please login to continue</h1> : <h1>Login</h1>}
            <div className={styles.error}>{this.state.error}</div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div className={styles['form-container']}>
                <div className={styles.form}>
                  <Input label="Email" name="email" type="email" onChange={e => this.handleInputChange(e)} value={this.state.email} />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    onChange={e => this.handleInputChange(e)}
                    value={this.state.password}
                  />
                  <Button dark className={styles.button} onClick={e => this.handleSubmit(e)}>
                    Login
                  </Button>
                </div>
                <div className={styles.buttons}>
                  <ButtonGroup>
                    <Button danger className={styles.icon} icon="google" onClick={e => this.handleSignInWithGoogle(e)} />
                    <Button danger className={styles.text} onClick={e => this.handleSignInWithGoogle(e)}>
                        Sign In With Google
                    </Button>
                  </ButtonGroup>
                  <hr />
                  <ButtonGroup>
                    <Button dark className={styles.icon} icon="envelope" to="/register" />
                    <Button dark className={styles.text} to="/register" >
                        Sign up with e-mail
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  authenticate: PropTypes.func.isRequired,
  authenticateWithGoogle: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  authenticate,
  authenticateWithGoogle,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
