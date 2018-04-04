import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';

import { getTrackedMoviesByUser } from '../../utils/user';
import Table from '../../components/table/Table';
import Icon from '../../components/icon/Icon';

import styles from './ListView.scss';

class ListView extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'TO_WATCH',
  };

  static mapResponseToMovie = element => ({
    id: element.movieId,
    title: element.title,
    length: `${element.runTime} minutes`,
    year: moment(element.year).year(),
    rating: element.imdbRating,
    toggleWatch: <Icon type="eye" />,
    delete: <Icon type="trash" />,
  });

  state = {
    movies: [],
  };

  componentDidMount() {
    const { type, userId } = queryString.parse(this.props.history.location.search);
    getTrackedMoviesByUser(userId)
      .then((response) => {
        console.log(response);
        if (type === 'TO_WATCH') {
          this.setState({
            movies: response
              .filter(x => !x.watched)
              .map(m => ListView.mapResponseToMovie(m)),
          });
        } else if (type === 'WATCHED') {
          this.setState({
            movies: response
              .filter(x => x.watched)
              .map(m => ListView.mapResponseToMovie(m)),
          });
        }
      });
  }

  onClick(e, movie) {
    e.stopPropagation();
    this.props.history.push(`/movies/${movie.id}`);
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
      toggleWatch: <Icon type="eye" />,
      delete: <Icon type="trash" />,
    };
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles.view__content}>
          {this.props.type && this.props.type === 'TO_WATCH' &&
            <h4>Has to watch</h4>
          }
          {this.props.type && this.props.type === 'WATCHED' &&
            <h4>Has watched</h4>
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

export default withRouter(ListView);
