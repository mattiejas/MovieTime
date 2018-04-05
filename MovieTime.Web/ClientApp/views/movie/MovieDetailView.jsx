import React from 'react';
import PropTypes from 'prop-types';
import Vibrant from 'node-vibrant';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../utils/auth';
import { requestMovieById } from '../../modules/movies';
import { trackMovie, untrackMovie, isMovieTracked, toggleWatchStatus } from '../../utils/movie';

import MoviePoster from '../../components/movie/MoviePoster';
import MovieHeading from '../../components/movie/MovieHeading';
import MovieAttributes from '../../components/movie/MovieAttributes';
import Placeholder from '../../components/placeholder/Placeholder';
import ParagraphPlaceholder from '../../components/placeholder/ParagraphPlaceholder';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';

import styles from './MovieDetailView.scss';
import CommentSection from '../../components/comments/CommentSection';

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
      // eslint-disable-next-line react/no-unused-state
      hasTrackedOnRedirect: false,
    };

    this.handleTracking = this.handleTracking.bind(this);
    this.handleUntracking = this.handleUntracking.bind(this);
    this.handleWatching = this.handleWatching.bind(this);
    this.loadMovieDetails = this.loadMovieDetails.bind(this);
  }

  async componentDidMount() {
    await this.loadMovieDetails(this.props.match.params.id);
  }

  async componentWillReceiveProps(props) {
    if (this.props.match.params.id !== props.match.params.id) {
      await this.loadMovieDetails(props.match.params.id);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // track movie if it was a redirect from login
    if (nextProps.isAuthenticated
      && nextProps.history.location.state
      && nextProps.history.location.state.shouldTrackMovie
      && nextState.movie.imdbId
      && !nextState.hasTrackedOnRedirect
    ) {
      trackMovie(nextState.movie.imdbId)
        .then((response) => {
          if (response.ok) {
            this.setState({
              isTracking: true,
              isDisabled: false,
              // eslint-disable-next-line react/no-unused-state
              hasTrackedOnRedirect: true,
            });
          }
        })
        .catch(err => err);
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

  async loadMovieDetails(id) {
    try {
      let newMovie;
      if (!this.props.movie.title) {
        // fetch movie from backend
        newMovie = await this.props.requestMovieById(id);
      } else {
        // movie is not 'new', get it from cache
        newMovie = this.props.movie;
      }

      // Using this.setState is correct, because we are using ES2017 async instead of Promises.
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        movie: newMovie,
        isLoading: false,
      });

      if (newMovie.poster && newMovie.poster !== 'N/A') {
        this.setBackgroundColor(newMovie.poster);
      }

      if (this.props.isAuthenticated) {
        const user = await getUser();
        const track = await isMovieTracked(user.uid, newMovie.imdbId);

        this.setState({
          isTracking: track.isTracked,
          isWatched: track.isWatched,
        });
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
      genres = [],
      director = '',
      writer = '',
      actors = '',
      imdbRating = '',
      plot = '',
      imdbId,
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
                <Placeholder isReady={!this.state.isLoading}>
                  <MoviePoster source={poster} alt={`${title} poster`} />
                </Placeholder>
              }
              {poster === 'N/A' &&
                <img src="/assets/poster-placeholder.jpg" alt={title} className={styles['fallback-image']} />
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
                    <MovieAttributes rating={imdbRating} time={runTime} genres={genres} />
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
                  {!this.state.isTracking && this.props.isAuthenticated &&
                    <Button dark disabled={this.state.isDisabled ? 'disabled' : ''} onClick={this.handleTracking}>
                      Track
                    </Button>
                  }
                  {this.state.isTracking && this.props.isAuthenticated &&
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
                  {
                    !this.props.isAuthenticated &&
                    <Button
                      dark
                      toState={{
                      pathname: '/login',
                      state: {
                        redirectTo: this.props.history.location.pathname,
                        redirectState: { shouldTrackMovie: true },
                      },
                      }}
                    >
                      Track
                    </Button>
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
          {
            this.props.isAuthenticated &&
            <Placeholder
              isReady={!this.state.isLoading}
            >
              <CommentSection type="movie" id={imdbId} title="Comments" showSpoilerWarning={!this.state.isWatched} />
            </Placeholder>
          }
        </div>
      </div>
    );
  }
}

MovieDetailView.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  movie: PropTypes.objectOf(PropTypes.any),
  requestMovieById: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

MovieDetailView.defaultProps = {
  movie: {},
};

MovieDetailView.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.authenticated,
  movie: state.movies[props.match.params.id] || {},
});

const mapDispatchToProps = {
  requestMovieById,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetailView));
