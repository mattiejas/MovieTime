import React from 'react';
import PropTypes from 'prop-types';
import Vibrant from 'node-vibrant';

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
      backgroundColor: undefined,
    };
  }

  componentDidMount() {
    fetch(API + this.props.match.params.title).then((response) => response.json()).then((data) => {
      this.setState({
        movie: data,
      });
      this.setBackgroundColor(data.poster);
    });
  }

  setBackgroundColor(poster) {
    Vibrant.from(poster).getPalette()
      .then(palette => this.setState({
        backgroundColor: `rgb(${palette.Vibrant.r}, ${palette.Vibrant.g}, ${palette.Vibrant.b})`,
      }));
  }

  render() {
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
        <div
          className={styles.view__background}
          style={this.state.backgroundColor ? {
            transition: 'background-color .5s ease-in',
            background: this.state.backgroundColor,
          } : {}}
        />
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
