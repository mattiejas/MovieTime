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

  toggleMovieState(e, movie) {
    e.stopPropagation();

    if (movie.isTracked && movie.isWatched) {
      // untrack movie
      // TODO: put movie back at the right index
      const untracked = movie;
      untracked.isTracked = false;
      untracked.isWatched = false;
      untracked.watched = <Icon type="plus" onClick={x => this.toggleMovieState(x, untracked)} />;
      this.setState({
        movies: [
          ..._.remove(this.state.movies, m => movie.id !== m.id),
          movie,
        ],
      });
    } else if (movie.isTracked && !movie.isWatched) {
      // mark movie as watched
    } else {
      // track movie
    }

    console.log('movie:', movie.id);
  }

  search(query) {
    // do API call
    searchMovies(query).then((data) => {
      if (this.props.authId) {
        const areMoviedTracked = _.map(data, m => isMovieTracked(this.props.authId, m.id));
        Promise.all(areMoviedTracked).then((tracked) => {
          const movies = [];
          tracked.forEach((t) => {
            movies.push({ ..._.find(data, x => x.id === t.id), ...t });
          });

          console.log(movies);

          this.setState({
            movies: _.map(movies, m => ({
              id: m.id,
              title: m.title,
              length: m.runTimeInMinutes,
              year: m.year,
              genre: m.genre,
              rating: m.rating,
              watched: <Icon type={m.isTracked ? 'eye' : 'plus'} onClick={e => this.toggleMovieState(e, m)} />,
            })),
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles.view__content}>
          <h4>Search on &#39;{this.props.match.params.query}&#39;</h4>
          <Table
            headers={{
              title: 'Title',
              length: 'Length',
              year: 'Year',
              genre: 'Genre',
              rating: 'Rating',
              watched: <Icon type="eye" />,
            }}
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
