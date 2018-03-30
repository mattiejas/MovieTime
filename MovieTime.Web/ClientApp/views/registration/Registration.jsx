import React from 'react';
import PropTypes from 'prop-types';
import checkPassword from 'hibp-checker';
import isEmail from 'validator/lib/isEmail';

import { logout, register } from '../../utils/auth';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';

import styles from './Registration.scss';

class Registration extends React.Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      fieldErrors: {},
      fieldError: null,
      isLoading: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.isFormInputInvalid = this.isFormInputInvalid.bind(this);
    this.isPassword = this.isPassword.bind(this);
    this.isName = this.isName.bind(this);
  }

  async onFormSubmit(event) {
    event.preventDefault();

    const person = {
      firstName: this.state.fields['first-name'],
      lastName: this.state.fields['last-name'],
      email: this.state.fields.email,
      password: this.state.fields.password,
    };
    if (await this.isFormInputInvalid()) return;

    this.setState({
      isLoading: true,
    });

    register(person)
      .then((response) => {
        if (!response.success) {
          this.setState({
            fieldError: response.message,
            isLoading: false,
          });
        } else {
          logout();
          this.props.history.push('/login', { afterRegister: true });
        }
      });
  }

  onInputChange(e, error) {
    const { name, value } = e.target;
    const { fields, fieldErrors } = this.state;

    fields[name] = value;
    fieldErrors[name] = error;
    this.setState({
      fields,
      fieldErrors,
      fieldError: null,
    });
  }

  async isFormInputInvalid() {
    const { fields, fieldErrors } = this.state;
    if (!fields.email || !fields.password || !fields['repeat-password'] || !fields['first-name'] || !fields['last-name']) {
      this.setState({ fieldError: 'Some required fields are still empty' });
      return true;
    }

    const errMessages = Object.keys(fieldErrors)
      .filter(k => fieldErrors[k]);
    await this.isPassword(fields.password, fields['repeat-password']);
    if (this.state.fieldError) return true;
    if (errMessages.length) return true;
    return false;
  }

  async isPassword(password, repeatPassword) {
    if (password !== repeatPassword) {
      this.setState({ fieldError: 'Password does not match' });
    } else if (password.length < 6 || repeatPassword.length < 6) {
      return false;
    } else {
      const breachCount = await checkPassword(password);
      if (breachCount > 100) {
        this.setState({ fieldError: 'This password has been cracked over a 100 times, please come up with a stronger password.' });
      }
    }
  }

  isName(value) {
    name = value.replace(/^([a-z\u00C0-\u02AB'´`]{1,}\.?\s?)([a-z\u00C0-\u02AB'´`]?\.?\s?)+$/i, ' ');
    return name === ' ' && name.length < 35;
  }

  render() {
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles['view__content--wrapper']}>
          <div className={styles.view__content}>
            <h1>Register</h1>
            <hr />
            <Spinner hidden={!this.state.isLoading} />
            <form onSubmit={this.onFormSubmit}>
              <div className={styles.group}>
                <Input
                  label="First Name"
                  name="first-name"
                  value={this.state.fields['first-name']}
                  onChange={(e, error) => this.onInputChange(e, error)}
                  validate={value => (this.isName(value) ? null : 'Name must be less than 35 characters and contain only common letters and symbols')}
                />
                <Input
                  label="Last Name"
                  name="last-name"
                  value={this.state.fields['last-name']}
                  onChange={(e, error) => this.onInputChange(e, error)}
                  validate={value => (this.isName(value) ? null : 'Name must be less than 35 characters and contain only common letters and symbols')}
                />
              </div>
              <Input
                label="Email"
                name="email"
                value={this.state.fields.email}
                onChange={(e, error) => this.onInputChange(e, error)}
                validate={val => (isEmail(val) ? null : 'Email is invalid')}
              />
              <div className={styles.group}>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={this.state.fields.password}
                  onChange={(e, error) => this.onInputChange(e, error)}
                  validate={value => (value.length < 6 ? 'Password has to be at least 6 characters' : null)}
                />
                <Input
                  label="Repeat Password"
                  name="repeat-password"
                  type="password"
                  value={this.state.fields['repeat-password']}
                  onChange={(e, error) => this.onInputChange(e, error)}
                  validate={value => (value !== this.state.fields.password ? 'Password does not match' : null)}
                />
              </div>
              <Button
                dark
                type="submit"
                className={styles.button}
                onClick={e => this.onFormSubmit(e)}
              >
                Register
              </Button>
              <span className={styles.error}>{this.state.fieldError}</span>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
