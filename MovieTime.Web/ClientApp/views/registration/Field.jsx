import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Field extends Component {
  state = {
    value: this.props.value,
    error: false,
  };

  componentWillReceiveProps(update) {
    this.setState({ value: update.value });
  }

  onChange = async (evt) => {
    const { name } = this.props;
    const { value } = evt.target;
    const error = this.props.validate ? this.props.validate(value) : false;
    this.setState({ value, error });
    this.props.onChange({ name, value, error });
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

Field.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

export default Field;
