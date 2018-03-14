import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';

import history from '../../utils/history';

import styles from './SearchInput.scss';

class SearchInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    onSearch: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      redirectTo: '',
    };
  }

  onChange() {
    this.setState({
      searchQuery: this.SearchInput.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.onSearch) this.props.onSearch();
    if (this.state.searchQuery && this.state.searchQuery.length > 1) {
      this.setState({
        redirectTo: `/movie/detail/${this.state.searchQuery}`,
      }, () => {
        history.push(this.state.redirectTo);
      });
    }
  }

  render() {
    return (
      <form className={styles['search-form']} onSubmit={e => this.onSubmit(e)}>
        <input
          className={styles['search-input']}
          placeholder="Search..."
          ref={(input) => { this.SearchInput = input; }}
          onChange={e => this.onChange(e.target.value)}
        />
        <Icon className={styles['search-icon']} type="search" />
      </form>
    );
  }
}

export default SearchInput;
