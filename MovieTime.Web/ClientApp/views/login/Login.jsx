import React, { Component } from 'react';

import { login } from '../../utils/auth';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import styles from './Login.scss';

export default class Login extends Component {
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

    login(this.state.email, this.state.password)
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
            <h1>Login</h1>
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
