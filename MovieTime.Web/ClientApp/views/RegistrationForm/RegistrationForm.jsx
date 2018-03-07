import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { register } from '../../utils/auth';
import Field from './Field'

export class RegistrationForm extends React.Component {

    state = {
        fields: {
            email: '',
            password: '',
        },
        fieldErrors: {},
        numberOfBreaches:0,
    }

    isFormInputInValid = () => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        if (!fields.email) return true;
        if (!fields.password) return true;
        if (errMessages.length) return true;
    };


    onFormSubmit = (evt) => {
        console.log('inside onformsubmit');

        const person = this.state.fields;
        evt.preventDefault();

        if (this.isFormInputInValid()) return;

        this.registerUserWithFireBase(person);

        this.setState({
            fields: {
                email: '',
                password: '',
            },
        });
    };

    onInputChange = ({ name, value, error }) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({fields, fieldErrors});
    };


    registerUserWithFireBase = (person) => {
        console.log('inside registerUserWithFireBase function' );
        register(person.email, person.password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode);
                console.log(errorMessage);
            });
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
                            validate={(val) => (isEmail(val)? false: 'Email required')}
                        />

                    <br />

                    <label> Password: </label>
                    <Field
                        placeholder='Password'
                        name='password'
                        value={this.state.fields.password}
                        onChange={this.onInputChange}
                        validate={(val) => (val? false:'Password Required'  )}
                    />

                    <br />

                    <input
                        type="submit"
                        disabled={this.isFormInputInValid()}
                    />
                </form>
            </div>

        );
    }
}

export default RegistrationForm;