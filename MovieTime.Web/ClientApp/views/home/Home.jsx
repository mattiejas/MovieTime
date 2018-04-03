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
    getTrendingMovies(4).then(movies => this.setState({
      trending: movies,
    }));

    getRecentlyTrackedMovies(4).then(movies => this.setState({
      recentlyTracked: movies,
    }));
  }

  render() {
    return (
      <div className={styles.view}>
        <div className={styles.background} />
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>MovieTime</h1>
            <p>Because there a so many good movies and there is so little time</p>
          </div>
          <ListWidget movies={this.state.trending} title="Trending" />
          <ListWidget movies={this.state.recentlyTracked} title="Recently Tracked" />
        </div>
      </div>
    );
  }
}


export default Home;
