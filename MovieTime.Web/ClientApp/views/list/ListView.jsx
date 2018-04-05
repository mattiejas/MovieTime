import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';

import { getTrackedMoviesByUser } from '../../utils/user';
import {
  isMovieTracked,
  toggleWatchStatus,
  untrackMovie,
  trackMovie,
} from '../../utils/movie';
import { getUser } from '../../modules/users';

import Table from '../../components/table/Table';
import Icon from '../../components/icon/Icon';

import styles from './ListView.scss';

class ListView extends Component {
    static propTypes = {
      history: PropTypes.objectOf(PropTypes.any).isRequired,
      authId: PropTypes.string,
      user: PropTypes.objectOf(PropTypes.any),
      getUser: PropTypes.func.isRequired,
    };

    static defaultProps = {
      authId: null,
      user: {},
    };

    static mapResponseToMovie = element => ({
      id: element.movieId,
      title: element.title,
      length: `${element.runTime} minutes`,
      year: moment(element.year).year(),
      rating: element.imdbRating,
    });

    state = {
      movies: [],
      type: queryString.parse(this.props.history.location.search).type,
      userId: queryString.parse(this.props.history.location.search).userId,
    };

    componentDidMount() {
      this.props.getUser(queryString.parse(this.props.history.location.search).userId);
      this.fetchData();
    }

    componentWillReceiveProps(nextProps) {
      const { type, userId } = queryString.parse(this.props.history.location.search);
      if (
        !this.props.authId ||
            this.props.authId !== nextProps.authId ||
            this.state.userId !== userId ||
            this.state.type !== type
      ) {
        this.setState({
          type,
          userId,
        }, () => this.fetchData());
      }
    }

    onClick(e, movie) {
      e.stopPropagation();
      this.props.history.push(`/movies/${movie.id}`);
    }

    fetchData() {
      getTrackedMoviesByUser(this.state.userId).then((response) => {
        let data;
        if (this.state.type === 'to_watch') {
          data = response.filter(x => !x.watched);
        } else if (this.state.type === 'watched') {
          data = response.filter(x => x.watched);
        }

        if (this.props.authId) {
          // when authenticated show track state of the movie
          const areMoviedTracked = _.map(data, m =>
            isMovieTracked(this.props.authId, m.movieId));
          Promise.all(areMoviedTracked).then((tracked) => {
            const movies = [];
            tracked.forEach((t) => {
              movies.push({
                ..._.find(data, x => x.movieId === t.id),
                ...t,
              });
            });

            this.setState({
              movies: _.map(movies, (m) => {
                const mapped = {
                  ...ListView.mapResponseToMovie(m),
                  isTracked: m.isTracked,
                  isWatched: m.isWatched,
                };

                mapped.watched = (
                  <Icon
                    // oh baby, it's a double 🤷‍♀️
                    // eslint-disable-next-line no-nested-ternary
                    type={mapped.isTracked ? mapped.isWatched ? 'eye-slash' : 'eye' : 'plus'}
                    onClick={e => this.toggleMovieState(e, mapped)}
                  />
                );
                return mapped;
              }),
            });
          });
        } else {
          // don't show track state when not authenticated
          this.setState({
            movies: _.map(data, m => ListView.mapResponseToMovie(m)),
          });
        }
      });
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
          untracked.watched = (
            <Icon
              type="plus"
              onClick={x => this.toggleMovieState(x, untracked)}
            />
          );
          this.replaceMovie(movie, untracked);
        });
      } else if (movie.isTracked && !movie.isWatched) {
        toggleWatchStatus(movie.id).then(() => {
          const watched = {
            ...movie,
            isTracked: true,
            isWatched: true,
          };
          watched.watched = (
            <Icon
              type="eye-slash"
              onClick={x => this.toggleMovieState(x, watched)}
            />
          );
          this.replaceMovie(movie, watched);
        });
      } else {
        trackMovie(movie.id).then(() => {
          const tracked = {
            ...movie,
            isTracked: true,
            isWatched: false,
          };
          tracked.watched = (
            <Icon
              type="eye"
              onClick={x => this.toggleMovieState(x, tracked)}
            />
          );
          this.replaceMovie(movie, tracked);
        });
      }
    }

    render() {
      if (this.state === null) {
        return null;
      }

      const headers = {
        title: 'Title',
        length: 'Length',
        year: 'Year',
        rating: 'Rating',
      };

      if (this.props.authId) {
        headers.watched = <Icon type="eye" />;
      }

      return (
        <div>
          <div className={styles.view__background} />
          <div className={styles.view__content}>
            {this.state.type === 'to_watch' &&
              <h4>{this.props.user.firstName} {this.props.user.lastName} wants to watch</h4>
            }
            {this.state.type === 'watched' &&
              <h4>{this.props.user.firstName} {this.props.user.lastName} has watched</h4>
            }
            <Table
              headers={headers}
              rows={this.state.movies}
              onRowClick={(e, movie) => this.onClick(e, movie)}
            />
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state, props) => ({
  authId: (state.auth.user && state.auth.user.id) || null,
  user: state.users[queryString.parse(props.history.location.search).userId],
});

const mapDispatchToProps = {
  getUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListView));
