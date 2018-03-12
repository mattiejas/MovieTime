import React, { Component } from 'react';

const API = '/api/movie/title/';

class SearchInput extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      searchResults: {},
    };
  }

  onChange(val) {
    console.log('onChange', val);
    this.setState({
      searchQuery: this.SearchInput.value,
    });
  }

  onSubmit(val) {
    console.log('onSubmit', this.state.searchQuery);
    if (this.state.searchQuery && this.state.searchQuery.length > 1) {
      if (this.state.searchQuery.length % 2 === 0) {
        this.getSearchResults();
      }
    }
  }

  getSearchResults() {
    console.log('fetching search results, for', this.state.searchQuery);
    fetch(API + this.state.searchQuery).then(response => response.json()).then((data) => {
      this.setState({
        searchResults: data,
      });
      console.log(data);
    });
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search..."
          ref={input => this.SearchInput = input}
          onChange={e => this.onChange(e.target.value)}
          onSubmit={e => this.onSubmit(e)}
        />
        <p>{this.state.searchResults.title}</p>
      </form>
    );
  }
}

export default SearchInput;
