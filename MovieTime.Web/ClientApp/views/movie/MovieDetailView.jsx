import React from 'react';
import PropTypes from 'prop-types';
import Vibrant from 'node-vibrant';

import MoviePoster from '../../components/movie/MoviePoster';
import MovieHeading from '../../components/movie/MovieHeading';
import MovieAttributes from '../../components/movie/MovieAttributes';
import Placeholder from '../../components/placeholder/Placeholder';
import ParagraphPlaceholder from '../../components/placeholder/ParagraphPlaceholder';

import styles from './MovieDetailView.scss';

const API = '/api/movie/title/';

class MovieDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      backgroundColor: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(API + this.props.match.params.title).then(response => response.json()).then((data) => {
      setTimeout(() => this.setState({
        movie: data,
        isLoading: false,
      }), 200);
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
                <Placeholder isReady={!this.state.isLoading}>
                  <MovieHeading title={title} year={year} />
                </Placeholder>
              </div>
              <MoviePoster source={poster} alt={`${title} poster`} />
            </div>
            <div className="*column">
              <div className={styles.view__content__heading}>
                <div className="*flex-child">
                  <div className={styles.desktop}>
                    <Placeholder isReady={!this.state.isLoading}>
                      <MovieHeading title={title} year={year} />
                    </Placeholder>
                  </div>
                  <Placeholder isReady={!this.state.isLoading}>
                    <MovieAttributes rating={6} time={runTime} genres={genre} />
                  </Placeholder>
                </div>
              </div>
              <ParagraphPlaceholder
                isReady={!this.state.isLoading}
                width={300}
                height={20}
                lineHeight={1.8}
                lines={3}
              >
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
              </ParagraphPlaceholder>
              <ParagraphPlaceholder
                isReady={!this.state.isLoading}
                width={500}
                height={20}
                lineHeight={1.5}
                lines={5}
              >
                <p>{plot}</p>
              </ParagraphPlaceholder>
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
