import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { register } from '../../utils/auth';
import Field from './Field'
import checkPassword from 'hibp-checker';

export class RegistrationForm extends React.Component {

  state = {
    fields: {
      email: '',
      password: '',
    },
    fieldErrors: {},
    isPwned: false,
  }

  onFormSubmit = async (evt) => {
    console.log('inside onformsubmit');

    const person = this.state.fields;
    evt.preventDefault();

    if ( await this.isFormInputInValid()) return;

    this.registerUserWithFireBase(person);

    this.setState({
      fields: {
        email: '',
        password: '',
      },
    });
  };

  isFormInputInValid = async () => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);
    await this.isPassword(fields.password);
    if (this.state.isPwned) return true;
    if (!fields.email) return true;
    if (!fields.password) return true;
    if (errMessages.length) return true;
  };

  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const isPwned = false;

    fields[name] = value;
    fieldErrors[name] = error;

    this.setState({ fields, fieldErrors, isPwned });
  };

  isPassword = async (val) => {
    const breachCount = await checkPassword(val);
    if (breachCount > 100)
      this.setState({isPwned: 'Ohh noo! This password has been pwned more than 100 times! Please choose another.'});
  }


  registerUserWithFireBase = (person) => {
    register(person);
  };

  render() {
    console.log('hello render');
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label> E-mail: </label>
          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : 'Email required!')}
          />

          <br />

          <label> Password: </label>
          <Field
            placeholder='Password'
            name='password'
            value={this.state.fields.password}
            onChange={this.onInputChange}
            validate={(val) => (val.length>6 ? false : 'Password has to be at least 6 characters')}
          />
          <span style={{ color: 'red' }}> {this.state.isPwned}  </span>

          <br />
          

          <input
            type="submit"
          />
        </form>
      </div>

    );
  }
}

export default RegistrationForm;