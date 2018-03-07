import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkPassword from 'hibp-checker';

export class Field extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.value,
        error: false,
    };

    componentWillReceiveProps(update) {
        this.setState({value: update.value});
    }

    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        let error = this.props.validate ? this.props.validate(value) : false;
        if (!error && name === 'password') {
            checkPassword(value)
                .then((result) => {
                    console.log('onChange, checkPassword, Then> Result=', result);
                    if (result > 0) error = 'This password has been pwned!';
                    this.setState({ value, error });
                    this.props.onChange({ name, value, error });
                });
        } else {

            this.setState({ value, error });
            this.props.onChange({ name, value, error });
        }

    };

    render() {
        return (
            <div>
                <input
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <span style={{ color: 'red' }}> {this.state.error}  </span>
            </div>
            );
    }
}

export default Field;