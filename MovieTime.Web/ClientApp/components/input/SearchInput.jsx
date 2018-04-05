import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './SearchInput.scss';
import Button from '../button/Button';

class SearchInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    className: PropTypes.string,
    onClick: PropTypes.func,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static defaultProps = {
    onSearch: undefined,
    className: '',
    onClick: undefined,
  };

  state = {
    query: '',
  };

  onChange(val) {
    this.setState({
      query: val,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.onSearch) this.props.onSearch();
    if (this.state.query && this.state.query.length > 1) {
      this.props.history.push(`/search/${this.state.query}`);
      this.setState({
        query: '',
      });
    }
    this.input.focus();
  }

  /* Search on Button click and make search small again */
  onButtonClick(e) {
    this.input.focus();
    this.onSubmit(e);
    if (this.props.onClick) {
      this.props.onClick(e);
      this.input.blur();
    }
  }

  /* Search on Enter press and make search small again */
  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSubmit(e);
      if (this.props.onClick) {
        if (this.state.query !== '') {
          this.props.onClick(e);
        }
      }
    }
  }

  render() {
    return (
      <div className={cn(styles['search-form'], this.props.className)}>
        <input
          className={styles['search-input']}
          placeholder="Search..."
          onChange={e => this.onChange(e.target.value)}
          ref={(input) => { this.input = input; }}
          onKeyPress={e => this.onKeyPress(e)}
          value={this.state.query}
        />
        <Button icon="search" className={styles.button} onClick={e => this.onButtonClick(e)} />
      </div>
    );
  }
}

export default withRouter(SearchInput);
