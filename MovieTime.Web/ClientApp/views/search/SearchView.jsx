import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table from '../../components/table/Table';

import styles from './SearchView.scss';
import { searchMovies } from '../../utils/movie';
import Button from '../../components/button/Button';

class SearchView extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    authId: PropTypes.string,
  };

  static defaultProps = {
    authId: null,
  };

  static responseToMovieMapping = m => ({
    id: m.id,
    title: m.title,
    year: m.year,
  });

  state = {
    movies: {},
    page: 1,
    stopRequesting: false,
  };

  componentDidMount() {
    this.search(this.props.match.params.query);
    window.addEventListener('scroll', e => this.onScroll(e));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authId || this.props.match.params.query !== nextProps.match.params.query) {
      this.search(nextProps.match.params.query, 1);
    }
  }

  onClick(e, movie) {
    e.stopPropagation();
    if (movie.id) {
      this.props.history.push(`/movies/${movie.id}`);
    }
  }

  onScroll() {
    if (this.scrollTimeout) {
      this.scrollTimeout = clearTimeout(this.scrollTimeout);
    }

    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100)) {
      if (!this.state.stopRequesting) {
        this.scrollTimeout = setTimeout(() => this.nextPage(), 500);
      }
    }
  }

  setPage(index, content, updatePage = false) {
    this.setState({
      movies: {
        ...this.state.movies,
        [index]: content,
      },
      page: updatePage ? index + 1 : this.state.page,
    });
  }

  nextPage() {
    this.search(this.props.match.params.query);
  }

  search(query, page = this.state.page) {
    searchMovies(query, page)
      .then((data) => {
        this.setPage(page, _.map(data, movie => SearchView.responseToMovieMapping(movie)), true);
        if (data.length < 10) {
          this.setState({
            stopRequesting: true,
          });
        }
      });
  }

  render() {
    const headers = {
      title: 'Title',
      year: 'Year',
    };

    const pages = Object.keys(this.state.movies);
    const movies = [];
    pages.forEach((page) => {
      movies.push(...this.state.movies[page]);
    });

    if (this.state.stopRequesting) {
      movies.push({
        id: null,
        title: <span className={styles['no-results']}>No more results found</span>,
      });
    }

    return (
      <div>
        <div className={styles.view__background}>
          <div className={styles.container}>
            <h4>Search on &#39;<span>{this.props.match.params.query}</span>&#39;</h4>
          </div>
        </div>
        <div className={styles.view__content} ref={(content) => { this.content = content; }}>
          <Table
            headers={headers}
            rows={movies}
            onRowClick={(e, m) => this.onClick(e, m)}
          />
          <Button onClick={() => this.nextPage()}>Next Page</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authId: (state.auth.user && state.auth.user.id) || null,
});

export default connect(mapStateToProps)(SearchView);
