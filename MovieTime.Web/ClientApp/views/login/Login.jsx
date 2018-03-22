import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login as fbLogin, logout } from '../../utils/auth';
import { getUserData } from '../../utils/user';
import { setAuthenticated } from '../../modules/auth';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import styles from './Login.scss';

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
  }

  handleSubmit(event) {
    event.preventDefault();

    fbLogin(this.state.email, this.state.password)
      .then((user) => {
        getUserData(user.uid).then((data) => {
          this.props.watchAuthenticationStateChange(true);
          this.props.history.push(this.props.history.location);
          this.props.setAuthenticated({ ...data, id: user.uid });
        }).catch((err) => {
          this.setState({
            error: err.message,
          });
          logout();
        });
      })
      .catch((err) => {
        this.setState({ error: err.message });
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
            {this.props.location.state && this.props.location.state.afterRegister ?
              <h1>Please login to continue</h1> :
              <h1>Login</h1>
            }
            <div className={styles.error}>{this.state.error}</div>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  onChange={e => this.handleInputChange(e)}
                  value={this.state.email}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  onChange={e => this.handleInputChange(e)}
                  value={this.state.password}
                />
              </div>
              <Button dark className={styles.button} onClick={e => this.handleSubmit(e)}>Login</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  watchAuthenticationStateChange: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setAuthenticated: PropTypes.func.isRequired,
};

export default connect(null, { setAuthenticated })(Login);
