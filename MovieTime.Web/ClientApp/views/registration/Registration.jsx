import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import { register } from '../../utils/auth';
import Field from './Field';
import checkPassword from 'hibp-checker';

export default class Registration extends React.Component {
  static async registerUserWithFireBase(person) {
    await register(person);
  }

  constructor(props) {
    super(props);

    this.state = {
      fields: { email: '', password: '' },
      fieldErrors: {},
      isPwned: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.isFormInputInValid = this.isFormInputInValid.bind(this);
    this.isPassword = this.isPassword.bind(this);
  }

  async onFormSubmit(event) {
    event.preventDefault();
    const person = this.state.fields;
    if (await this.isFormInputInValid()) return;

    this.constructor.registerUserWithFireBase(person);
    this.setState({
      fields: { email: '', password: '' },
    });
  }

  onInputChange({ name, value, error }) {
    const { fields, fieldErrors } = this.state;
    const isPwned = false;

    fields[name] = value;
    fieldErrors[name] = error;
    this.setState({ fields, fieldErrors, isPwned });
  }

  async isFormInputInValid() {
    const { fields, fieldErrors } = this.state;
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    await this.isPassword(fields.password);
    if (this.state.isPwned) return true;
    if (!fields.email) return true;
    if (!fields.password) return true;
    if (errMessages.length) return true;
    return false;
  }

  async isPassword(val) {
    const breachCount = await checkPassword(val);
    if (breachCount > 100) {
      this.setState({ isPwned: 'Ohh noo! This password has been pwned more than 100 times! Please choose another.' });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label> E-mail: </label>
          <Field
            placeholder="Email"
            name="email"
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={val => (isEmail(val) ? false : 'Email required!')}
          />

          <br />

          <label>Password:</label>
          <Field
            placeholder="Password"
            name="password"
            value={this.state.fields.password}
            onChange={this.onInputChange}
            validate={val => (val.length > 6 ? false : 'Password has to be at least 6 characters')}
          />
          <span style={{ color: 'red' }}>{this.state.isPwned}</span>
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
