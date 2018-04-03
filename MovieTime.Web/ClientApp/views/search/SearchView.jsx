import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table from '../../components/table/Table';
import Icon from '../../components/icon/Icon';

import styles from './SearchView.scss';
import { searchMovies } from '../../utils/movie';

class SearchView extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    this.search(this.props.match.params.query);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.search(nextProps.match.params.query);
    }
  }

  onClick(movie) {
    this.props.history.push(`/movies/${movie.id}`);
  }

  onEyeClick(e, id) {
    e.stopPropagation();
    console.log('movie:', id);
  }

  search(query) {
    // do API call
    searchMovies(query).then((data) => {
      console.log(data);
      this.setState({
        movies: _.map(data, m => ({
          id: m.id,
          title: m.title,
          length: m.runTimeInMinutes,
          year: m.year,
          genre: m.genre,
          rating: m.rating,
          watched: <Icon type="eye" onClick={e => this.onEyeClick(e, m.id)} />,
        })),
      });
    });
  }

  render() {
    return (
      <div>
        <div className={styles.view__background} />
        <div className={styles.view__content}>
          <h4>Search on &#39;{this.props.match.params.query}&#39;</h4>
          <Table
            headers={{
              title: 'Title',
              length: 'Length',
              year: 'Year',
              genre: 'Genre',
              rating: 'Rating',
              watched: <Icon type="eye" />,
            }}
            rows={this.state.movies}
            onRowClick={m => this.onClick(m)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authId: (state.auth.user && state.auth.user.id) || null,
});

export default connect(mapStateToProps)(SearchView);
