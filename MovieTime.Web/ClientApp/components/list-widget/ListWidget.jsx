/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';

import * as movieUtils from '../../utils/movie';

import styles from './ListWidget.scss';
import MoviePoster from '../movie/MoviePoster';

class ListWidget extends React.Component {
  state = {
    movies: [],
    isLoading: false,
    movieCount: null,
  };

  componentWillReceiveProps(props) {
    this.fetchMovies(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.movies.length <= nextState.movieCount && !nextState.isLoading) {
      return true;
    }
    return !_.isEqual(this.props.movies, nextProps.movies);
  }

  onClick(url) {
    this.props.history.push(url);
  }

  fetchMovies(props) {
    this.setState({
      movies: [],
      lastPosterIsViewAll: false,
      isLoading: true,
    });

    let movieCount;
    if (props.movies.length > 4) {
      movieCount = 4;
      this.setState({
        lastPosterIsViewAll: true,
        movieCount,
      });
    } else {
      movieCount = props.movies.length;
      this.setState({
        movieCount,
      });
    }

    let loadingTimeout;
    props.movies.slice(0, movieCount).forEach((movie) => {
      movieUtils.getMovieByTitle(movie).then((data) => {
        if (loadingTimeout) {
          loadingTimeout = clearTimeout(loadingTimeout);
        }

        this.setState({
          movies: [...this.state.movies, data],
        });

        loadingTimeout = setTimeout(() => this.setState({
          isLoading: false,
        }), 100);
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <div className={styles.wrapper}>
        <h4>{this.props.title}</h4>
        <div className={styles['list-widget']}>
          {
            _.map(
              this.state.movies.slice(
                0,
                this.state.lastPosterIsViewAll ? -1 : this.state.movies.length,
              ),
              (movie, i) =>
                (<MoviePoster
                  key={i}
                  className={styles.poster}
                  source={movie.poster}
                  alt={`${movie.title} poster`}
                  onClick={() => this.onClick(`/movies/${movie.title}`)}
                />),
            )
            }
          {
            this.state.movies.length > 0 && this.state.lastPosterIsViewAll &&
            <MoviePoster
              className={cn(styles.poster, styles['last-poster'])}
              source={this.state.movies[this.state.movies.length - 1].poster}
              alt={`${this.state.movies[this.state.movies.length - 1].title} poster`}
              onClick={() => this.onClick('/list')}
            />
          }
        </div>
      </div>
    );
  }
}

ListWidget.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
};

export default ListWidget;
