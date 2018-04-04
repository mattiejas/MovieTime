import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table from '../../components/table/Table';
import Icon from '../../components/icon/Icon';

import styles from './SearchView.scss';
import { searchMovies, isMovieTracked, trackMovie, untrackMovie, toggleWatchStatus } from '../../utils/movie';

class SearchView extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    authId: PropTypes.string,
  };

  static defaultProps = {
    authId: null,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    this.search(this.props.match.params.query);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authId || this.props.match.params.query !== nextProps.match.params.query) {
      this.search(nextProps.match.params.query);
    }
  }

  onClick(movie) {
    this.props.history.push(`/movies/${movie.id}`);
  }

  replaceMovie(movie, replacement) {
    const index = _.findIndex(this.state.movies, m => m.id === movie.id);

    this.setState({
      movies: [
        ...this.state.movies.slice(0, index),
        replacement,
        ...this.state.movies.slice(index + 1),
      ],
    });
  }

  toggleMovieState(e, movie) {
    e.stopPropagation();

    if (movie.isTracked && movie.isWatched) {
      untrackMovie(movie.id).then(() => {
        const untracked = {
          ...movie,
          isTracked: false,
          isWatched: false,
        };
        untracked.watched = <Icon type="plus" onClick={x => this.toggleMovieState(x, untracked)} />;
        this.replaceMovie(movie, untracked);
      });
    } else if (movie.isTracked && !movie.isWatched) {
      toggleWatchStatus(movie.id).then(() => {
        const watched = {
          ...movie,
          isTracked: true,
          isWatched: true,
        };
        watched.watched = <Icon type="eye-slash" onClick={x => this.toggleMovieState(x, watched)} />;
        this.replaceMovie(movie, watched);
      });
    } else {
      trackMovie(movie.id).then(() => {
        const tracked = {
          ...movie,
          isTracked: true,
          isWatched: false,
        };
        tracked.watched = <Icon type="eye" onClick={x => this.toggleMovieState(x, tracked)} />;
        this.replaceMovie(movie, tracked);
      });
    }
  }

  search(query) {
    searchMovies(query).then((data) => {
      // when authenticated show track state of the movie
      if (this.props.authId) {
        const areMoviedTracked = _.map(data, m => isMovieTracked(this.props.authId, m.id));
        Promise.all(areMoviedTracked).then((tracked) => {
          const movies = [];
          tracked.forEach((t) => {
            movies.push({ ..._.find(data, x => x.id === t.id), ...t });
          });

          this.setState({
            movies: _.map(movies, m => ({
              id: m.id,
              title: m.title,
              length: m.runTimeInMinutes,
              year: m.year,
              genre: m.genre,
              rating: m.rating,
              watched: (
                <Icon
                  // oh baby, it's a double 🤷‍♀️
                  // eslint-disable-next-line no-nested-ternary
                  type={m.isTracked ? (m.isWatched ? 'eye-slash' : 'eye') : 'plus'}
                  onClick={e => this.toggleMovieState(e, m)}
                />
              ),
            })),
          });
        });

      // don't show track state when not authenticated
      } else {
        this.setState({
          movies: _.map(data, m => ({
            id: m.id,
            title: m.title,
            length: m.runTimeInMinutes,
            year: m.year,
            genre: m.genre,
            rating: m.rating,
          })),
        });
      }
    });
  }

  render() {
    const headers = {
      title: 'Title',
      year: 'Year',
    };

    if (this.props.authId) {
      headers.watched = <Icon type="eye" />;
    }

    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles.view__content}>
          <h4>Search on &#39;{this.props.match.params.query}&#39;</h4>
          <Table
            headers={headers}
            rows={this.state.movies}
            onRowClick={m => this.onClick(m)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authId: (state.auth.user && state.auth.user.id) || null,
});

export default connect(mapStateToProps)(SearchView);
