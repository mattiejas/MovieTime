import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SearchInput extends Component {
  constructor() {
    super();

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

  render() {
    if (this.state.redirectTo) {
      console.log('hello', this.state.redirectTo);
      return (<Redirect to={this.state.redirectTo} />);
    }

    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <input
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
