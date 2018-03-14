import React, { Component } from 'react';
import { Redirect, Router } from 'react-router-dom';
import styles from './SearchInput.scss';
import MoviePoster from '../movie/MoviePoster';
import PropTypes from 'prop-types';

class SearchInput extends Component {

  static propTypes = {
      history: propTypes.any,
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
      });
    }
  }

  componentWillUnmount() {
    console.log('herrrroooo');
  }

  render() {
    if (this.state.redirectTo) {
      console.log('1223345456');
      return (<Redirect to={this.state.redirectTo} />);
      // this.setState({
      //   redirectTo: `/movie/detail/${this.state.searchQuery}`,
      // });
    }

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
