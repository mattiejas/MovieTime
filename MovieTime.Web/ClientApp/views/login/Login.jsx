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
import Spinner from '../../components/spinner/Spinner';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
      isLoading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignInWithGoogle = this.handleSignInWithGoogle.bind(this);
  }

  componentDidMount() {
    auth.getRedirectResult().then((result) => {
      if (result.user) {
        this.props.history.push(`/users/${result.user.uid}`);
      } else {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authId) {
      this.props.history.push(`/users/${nextProps.authId}`);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.authenticate(this.state.email, this.state.password)
      .then(() => {
        if (this.props.location.state && this.props.location.state.redirectTo) {
          this.props.history.push({
            pathname: this.props.location.state.redirectTo,
            state: this.props.location.state.redirectState || {},
          });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Invalid password or e-mail address. Please try again.' });
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
    if (this.state.isLoading) {
      return (
        <div>
          <div className={styles.view__background} />
          <div className={styles['view__content--wrapper']}>
            <div className={styles.view__content}>
              <Spinner />
            </div>
          </div>
        </div>
      );
    }
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
                  <ButtonGroup className={styles['sign-up-button']}>
                    <Button danger className={styles.icon} icon="google" onClick={e => this.handleSignInWithGoogle(e)} />
                    <Button danger className={styles.text} onClick={e => this.handleSignInWithGoogle(e)}>
                        Sign In With Google
                    </Button>
                  </ButtonGroup>
                  <hr />
                  <ButtonGroup className={styles['sign-up-button']}>
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  authenticate: PropTypes.func.isRequired,
  authenticateWithGoogle: PropTypes.func.isRequired,
  authId: PropTypes.string,
};

Login.defaultProps = {
  authId: null,
};

const mapPropsToState = state => ({
  authId: state.auth.user && state.auth.user.id,
});

const mapDispatchToProps = {
  authenticate,
  authenticateWithGoogle,
};

export default withRouter(connect(mapPropsToState, mapDispatchToProps)(Login));
