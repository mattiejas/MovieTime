import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchInput.scss';
import history from '../../utils/history';
import Icon from '../icon/Icon';

class SearchInput extends Component {
  static propTypes = {
    history: PropTypes.any,
  }

  static defaultProps = {
    history: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchResults: {},
      redirectTo: '',
    };
  }

  onChange(val) {
    console.log('onChange', val);
    this.setState({
      searchQuery: this.SearchInput.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.searchQuery && this.state.searchQuery.length > 1) {
      this.setState({
        redirectTo: `/movie/detail/${this.state.searchQuery}`,
      }, () => {
        history.push(this.state.redirectTo);
        history.go();
      });
    }
  }

  render() {
    return (
      <form className={styles['search-form']} onSubmit={e => this.onSubmit(e)}>
        <input
          className={styles['search-input']}
          placeholder="Search..."
          ref={input => this.SearchInput = input}
          onChange={e => this.onChange(e.target.value)}
        />
        <Icon className={styles['search-icon']} type="search" />
      </form>
    );
  }
}

export default SearchInput;
