import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as movieUtils from '../../utils/movie';

import styles from './ListWidget.scss';
import MoviePoster from '../movie/MoviePoster';

class ListWidget extends React.Component {
  state = {
    movies: [],
  };

  componentWillReceiveProps(props) {
    this.fetchMovies(props);
  }

  onClick(url) {
    this.props.history.push(url);
  }

  fetchMovies(props) {
    this.setState({
      movies: [],
    });
    const arraySize = props.movies.length > 4 ? 4 : props.movies.length;
    props.movies.slice(0, arraySize).forEach((movie) => {
      movieUtils.getMovieByTitle(movie).then((data) => {
        this.setState({
          movies: [...this.state.movies, data],
        });
      });
    });
  }

  render() {
    return (
      <div className={styles['list-widget']}>
        {
          _.map(this.state.movies.slice(0, -1), movie =>
            (<MoviePoster
              className={styles.poster}
              source={movie.poster}
              alt={`${movie.title} poster`}
              onClick={() => this.onClick(`/movies/${movie.title}`)}
            />))
        }
        {
          this.state.movies.length > 0 &&
          <MoviePoster
            className={styles.poster}
            source={this.state.movies[this.state.movies.length - 1].poster}
            alt={`${this.state.movies[this.state.movies.length - 1].title} poster`}
            onClick={() => this.onClick('/list')}
          />
        }
      </div>
    );
  }
}

ListWidget.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ListWidget;
