import React from 'react';
import PropTypes from 'prop-types';
import Vibrant from 'node-vibrant';
import { connect } from 'react-redux';


import { getUser } from '../../utils/auth';
import { requestMovieByTitle } from '../../modules/movies';
import { trackMovie, untrackMovie, isMovieTracked, toggleWatchStatus } from '../../utils/movie';

import MoviePoster from '../../components/movie/MoviePoster';
import MovieHeading from '../../components/movie/MovieHeading';
import MovieAttributes from '../../components/movie/MovieAttributes';
import Placeholder from '../../components/placeholder/Placeholder';
import ParagraphPlaceholder from '../../components/placeholder/ParagraphPlaceholder';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';

import styles from './MovieDetailView.scss';

class MovieDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {},
      isDisabled: false,
      isTracking: false,
      isWatched: false,
      backgroundColor: null,
      isLoading: true,
    };

    this.handleTracking = this.handleTracking.bind(this);
    this.handleUntracking = this.handleUntracking.bind(this);
    this.handleWatching = this.handleWatching.bind(this);
    this.loadMovieDetails = this.loadMovieDetails.bind(this);
  }

  async componentDidMount() {
    await this.loadMovieDetails(this.props.match.params.title);
  }

  async componentWillReceiveProps(props) {
    if (this.props.match.params.title !== props.match.params.title) {
      await this.loadMovieDetails(props.match.params.title);
    }
  }

  setBackgroundColor(poster) {
    Vibrant.from(poster).getPalette()
      .then((palette) => {
        const p = palette.Vibrant || palette.LightVibrant || palette.DarkVibrant;
        this.setState({
          backgroundColor: `rgb(${Math.floor(p.r)}, ${Math.floor(p.g)}, ${Math.floor(p.b)})`,
        });
      });
  }

  async loadMovieDetails(movieTitle) {
    try {
      const movie = await this.props.requestMovieByTitle(movieTitle);
      const user = await getUser();
      const track = await isMovieTracked(user.uid, movie.imdbId);

      // Using this.setState is correct, because we are using ES2017 async instead of Promises.
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        movie,
        isTracking: track.isTracked,
        isLoading: false,
        isWatched: track.isWatched,
      });
      if (movie.poster && movie.poster !== 'N/A') {
        this.setBackgroundColor(movie.poster);
      }
    } catch (err) {
      throw err;
    }
  }

  handleTracking(event) {
    event.preventDefault();
    this.setState({
      isDisabled: true,
    });
    trackMovie(this.state.movie.imdbId)
      .then((response) => {
        if (response.ok) {
          this.setState({
            isTracking: true,
            isDisabled: false,
          });
        }
      })
      .catch(err => err);
  }

  handleWatching(event) {
    event.preventDefault();
    this.setState({
      isWatchDisabled: true,
    });
    toggleWatchStatus(this.state.movie.imdbId)
      .then((response) => {
        this.setState({
          isWatched: response.watched,
          isWatchDisabled: false,
        });
      });
  }

  handleUntracking(event) {
    event.preventDefault();
    this.setState({
      isDisabled: true,
    });
    untrackMovie(this.state.movie.imdbId)
      .then((response) => {
        if (response.ok) {
          this.setState({
            isDisabled: false,
            isTracking: false,
          });
        }
      })
      .catch(err => err);
  }

  render() {
    const {
      title = '',
      year = '',
      poster,
      runTime = 0,
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
              {poster && poster !== 'N/A' &&
                <MoviePoster source={poster} alt={`${title} poster`} />
              }
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
                    <MovieAttributes rating={0} time={runTime} genres={genre || 'N/A'} />
                  </Placeholder>
                </div>
              </div>
              <div className={styles.content}>
                <ParagraphPlaceholder
                  isReady={!this.state.isLoading}
                  width={300}
                  height={20}
                  lineHeight={1.8}
                  lines={3}
                >
                  {!this.state.isTracking &&
                    <Button dark disabled={this.state.isDisabled ? 'disabled' : ''} onClick={this.handleTracking}>
                      Track
                    </Button>
                  }
                  {this.state.isTracking &&
                    <ButtonGroup>
                      <Button dark disabled={this.state.isDisabled ? 'disabled' : ''} onClick={this.handleUntracking}>
                        Tracking
                      </Button>
                      {!this.state.isWatched &&
                        <Button icon="eye" dark disabled={this.state.isWatchDisabled ? 'disabled' : ''} onClick={this.handleWatching}>
                          Mark as watched
                        </Button>
                      }
                      {this.state.isWatched &&
                        <Button icon="eye-slash" dark disabled={this.state.isWatchDisabled ? 'disabled' : ''} onClick={this.handleWatching}>
                          Mark as unwatched
                        </Button>
                      }
                    </ButtonGroup>
                  }
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
      </div>
    );
  }
}

MovieDetailView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  requestMovieByTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  movie: state.movies[props.match.params.title] || {},
});

const mapDispatchToProps = {
  requestMovieByTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailView);
