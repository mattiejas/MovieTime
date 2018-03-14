import React from 'react';
import checkPassword from 'hibp-checker';
import isEmail from 'validator/lib/isEmail';

import { register } from '../../utils/auth';

import Input from '../../components/input/Input';

import styles from './Registration.scss';
import Button from '../../components/button/Button';

export default class Registration extends React.Component {
  static async registerUserWithFireBase(person) {
    await register(person);
  }

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      fieldErrors: {},
      fieldError: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.isFormInputInvalid = this.isFormInputInvalid.bind(this);
    this.isPassword = this.isPassword.bind(this);
  }

  async onFormSubmit(event) {
    event.preventDefault();
    const person = this.state.fields;
    if (await this.isFormInputInvalid()) return;

    this.constructor.registerUserWithFireBase(person);
    this.setState({
      fields: { email: '', password: '' },
    });
  }

  onInputChange(e, error) {
    const { name, value } = e.target;
    const { fields, fieldErrors } = this.state;

    fields[name] = value;
    fieldErrors[name] = error;
    this.setState({ fields, fieldErrors, fieldError: null });
  }

  async isFormInputInvalid() {
    const { fields, fieldErrors } = this.state;
    if (!fields.email || !fields.password || !fields['repeat-password'] || !fields['first-name'] || !fields['last-name']) {
      this.setState({ fieldError: 'Some required fields are still empty' });
      return true;
    }

    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    await this.isPassword(fields.password);
    if (this.state.fieldError) return true;
    if (errMessages.length) return true;
    return false;
  }

  async isPassword(val) {
    const breachCount = await checkPassword(val);
    if (breachCount > 100) {
      this.setState({ fieldError: 'This password has been cracked over a 100 times, please come up with a stronger password.' });
    }
  }

  render() {
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles['view__content--wrapper']}>
          <div className={styles.view__content}>
            <h1>Register</h1>
            <hr />
            <form onSubmit={this.onFormSubmit}>
              <div className={styles.group}>
                <Input
                  label="First Name"
                  name="first-name"
                  value={this.state.fields['first-name']}
                  onChange={(e, error) => this.onInputChange(e, error)}
                  validate={value => (value.length <= 0 ? 'First Name is required' : null)}
                />
                <Input
                  label="Last Name"
                  name="last-name"
                  value={this.state.fields['last-name']}
                  onChange={(e, error) => this.onInputChange(e, error)}
                  validate={value => (value.length <= 0 ? 'Last Name is required' : null)}
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
                  validate={value => (value.length <= 6 ? 'Password has to be at least 6 characters' : null)}
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
