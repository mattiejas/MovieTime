import React from 'react';

import styles from './Home.scss';

const Home = () => (
  <div className={styles.view}>
    <div className={styles.background} />
    <div className={styles.content}>
      <h1>Hello, welcome to the MovieTime experience.</h1>
      <p>Start searching for movies at the top menu.</p>
    </div>
  </div>
);

export default Home;
