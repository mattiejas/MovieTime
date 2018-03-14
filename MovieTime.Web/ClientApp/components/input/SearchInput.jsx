import React, { Component } from 'react';
import styles from './SearchInput.scss';
import MoviePoster from '../movie/MoviePoster';
import PropTypes from 'prop-types';
import history from '../../utils/history';

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
      <form onSubmit={e => this.onSubmit(e)}>
        <input
          className={styles['search-input']}
          placeholder="Search..."
          ref={input => this.SearchInput = input}
          onChange={e => this.onChange(e.target.value)}
        />
        <p>{this.state.searchResults.title}</p>
      </form>
    );
  }
}

export default SearchInput;
