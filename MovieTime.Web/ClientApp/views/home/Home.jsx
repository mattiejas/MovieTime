import React from 'react';

import styles from './Home.scss';
import ListWidget from '../../components/list-widget/ListWidget';
import { getRecentlyTrackedMovies, getTrendingMovies } from '../../utils/movie';

class Home extends React.Component {
	state = {
	  trending: [],
	  recentlyTracked: [],
	};

	componentDidMount() {
	  getTrendingMovies(4).then(movies =>
	    this.setState({
	      trending: movies,
	    }));

	  getRecentlyTrackedMovies(4).then(movies =>
	    this.setState({
	      recentlyTracked: movies,
	    }));
	}

	render() {
	  return (
  <div className={styles.view}>
    <div className={styles.background}>
      <div className={styles.header}>
        <h1>MovieTime</h1>
        <h3>
							Because there are <span>SO MANY</span> good movies.
        </h3>
        <p>
							Track the movies you <span>(want to)</span> watch(ed) and share your reactions with a movie loving community.
        </p>
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
