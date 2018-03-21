import React from 'react';
import PropTypes from 'prop-types';

import ListWidget from '../../components/list-widget/ListWidget';

import styles from './Home.scss';

const Home = ({ history }) => (
  <div className={styles.view}>
    <div className={styles.background} />
    <div className={styles.content}>
      <ListWidget
        title="Trending"
        movies={['Thor: Ragnarok', 'Thor: Ragnarok', 'Thor: Ragnarok', 'Thor: Ragnarok']}
        history={history}
      />
    </div>
  </div>
);

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Home;
