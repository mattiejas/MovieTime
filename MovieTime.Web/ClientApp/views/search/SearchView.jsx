import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/table/Table';
import Icon from '../../components/icon/Icon';

import styles from './SearchView.scss';
import { getMovieByTitle, searchMovies } from '../../utils/movie';

class SearchView extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    // do API call
    searchMovies(this.props.match.params.query).then((data) => {
      console.log(data);
      this.setState({
        movies: [data],
      });
    });
  }

  render() {
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles.view__content}>
          <h4>Search on &#39;{this.props.match.params.query}&#39;</h4>
          <Table
            headers={['Title', 'Year', 'Length', 'Genre', 'Rating', <Icon type="eye" />]}
            rows={this.state.movies}
          />
        </div>
      </div>
    );
  }
}

export default SearchView;
