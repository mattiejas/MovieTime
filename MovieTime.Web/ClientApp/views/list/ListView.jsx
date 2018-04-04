import React, { Component } from 'react';
import queryString from 'query-string';

import { getTrackedMoviesByUser } from '../../utils/user';
import Table from '../../components/table/Table';

import styles from './ListView.scss';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const { type, userId } = queryString.parse(this.props.location.search);
    getTrackedMoviesByUser(userId)
      .then((response) => {
        console.log(response);
        if (type === 'TO_WATCH') {
          this.setState({
            movies: response
              .filter(x => !x.watched)
              .map(element => ({
                title: element.title,
                length: element.runTime,
                year: element.year,
                rating: element.imdbRating,
              })),
          });
        } else if (type === 'WATCHED') {
          this.setState({
            movies: response
              .filter(x => x.watched)
              .map(element => ({
                title: element.title,
                length: element.runTime,
                year: element.year,
                rating: element.imdbRating,
              })),
          });
        }
      });
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
          />
        </div>
      </div>
    );
  }
}

export default ListView;
