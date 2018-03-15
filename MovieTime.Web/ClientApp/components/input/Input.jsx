import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Input.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      value: props.value,
    };
  }

  validateAfterOnChange(e) {
    const { value } = e.target;
    const error = this.props.validate ? this.props.validate(value) : null;
    this.setState({ value, error });

    if (this.props.onChange) {
      this.props.onChange(e, error);
    }
  }

  render() {
    const {
      label,
      readOnly,
      validate,
      onChange,
      ...rest
    } = this.props;
    return (
      <div className={styles.wrapper}>
        {
          label &&
          <span className={cn(styles.label, this.state.error ? styles['error-label'] : undefined)}>{label}</span>
        }
        {
          this.state.error &&
          <span className={styles.error}>{this.state.error}</span>
        }
        <input
          readOnly={readOnly}
          className={styles.input}
          value={this.state.value}
          onChange={e => this.validateAfterOnChange(e)}
          {...rest}
        />
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  validate: PropTypes.func,
};

Input.defaultProps = {
  label: undefined,
  value: '',
  readOnly: false,
  onChange: undefined,
  validate: undefined,
};

export default Input;
