import React from 'react';
import PropTypes from 'prop-types';

import MoviePoster from '../../components/movie/MoviePoster';
import MovieHeading from '../../components/movie/MovieHeading';
import MovieAttributes from '../../components/movie/MovieAttributes';

import styles from './MovieDetailView.scss';

const API = '/api/movie/title/';

class MovieDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
  }
  componentDidMount() {
    fetch(API + this.props.match.params.title).then((response) => response.json()).then((data) => {
      this.setState({
        movie: data,
      });
    });
  }
  render() {
    console.log('whyyyyy???');
    const {
      title = '',
      year = '',
      poster,
      runTime = '0 m',
      genre = '',
      director = '',
      writer = '',
      actors = '',
      plot = '',
    } = this.state.movie;
    return (
      <div className={styles.view}>
        <div className={styles.view__background} />
        <div className={styles.view__content}>
          <div className={styles.view__content__container}>
            <div className="*column">
              <div className={styles.mobile}>
                <MovieHeading title={title} year={year} />
              </div>
              {
                poster &&
                <MoviePoster source={poster} alt={`${title} poster`} />
              }
            </div>
            <div className="*column">
              <div className={styles.view__content__heading}>
                <div className="*flex-child">
                  <div className={styles.desktop}>
                    <MovieHeading title={title} year={year} />
                  </div>
                  <MovieAttributes rating={6} time={runTime} genres={genre} />
                </div>
              </div>
              <table className={styles.view__content__involved}>
                <tbody>
                  <tr>
                    <th>Director:</th>
                    <td>{director}</td>
                  </tr>
                  <tr>
                    <th>Writers:</th>
                    <td>{writer}</td>
                  </tr>
                  <tr>
                    <th>Actors:</th>
                    <td>{actors}</td>
                  </tr>
                </tbody>
              </table>
              <p>{plot}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieDetailView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MovieDetailView;
