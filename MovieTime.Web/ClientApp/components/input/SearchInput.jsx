import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from '../icon/Icon';

import history from '../../utils/history';

import styles from './SearchInput.scss';

class SearchInput extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onSearch: undefined,
    className: '',
    onClick: undefined,
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
      <form className={cn(styles['search-form'], this.props.className)} onSubmit={e => this.onSubmit(e)}>
        <input
          className={styles['search-input']}
          placeholder="Search..."
          ref={(input) => { this.SearchInput = input; }}
          onChange={e => this.onChange(e.target.value)}
        />
        <button onClick={(e) => { if (this.props.onClick) this.props.onClick(e); }}>
          <Icon className={styles['search-icon']} type="search" />
        </button>
      </form>
    );
  }
}

export default SearchInput;
