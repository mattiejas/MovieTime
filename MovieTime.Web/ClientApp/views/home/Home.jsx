import React from 'react';
import _ from 'lodash';

import styles from './Home.scss';
import ListWidget from '../../components/list-widget/ListWidget';
import { getRecentlyTrackedMovies, getTrendingMovies } from '../../utils/movie';

class Home extends React.Component {
	state = {
	  trending: [],
	  recentlyTracked: [],
	};

	componentDidMount() {
	  getTrendingMovies(4).then(movies => this.setState({
	    trending: _.map(movies, m => ({
	      ...m,
	      movieId: m.imdbId,
	    })),
	  }));

	  getRecentlyTrackedMovies(4).then(movies => this.setState({
	    recentlyTracked: _.map(movies, m => ({
	      ...m,
	      movieId: m.imdbId,
	    })),
	  }));
	}

	render() {
	  return (
  <div className={styles.view}>
    <div className={styles.background}>
      <div className={styles.header}>
        <h1>MovieTime</h1>
        <h3>Because there are <span>SO MANY</span> good movies.</h3>
        <p>Track the movies you like and share your reactions with a movie loving community.</p>
      </div>
    </div>
    <div className={styles.content}>
      <ListWidget movies={this.state.trending} title="Trending" />
      <ListWidget movies={this.state.recentlyTracked} title="Recently Tracked" />
    </div>
  </div>
	  );
	}
}

export default Home;
