import React from 'react';
import PropTypes from 'prop-types';

import ListWidget from '../../components/list-widget/ListWidget';

const Home = ({ history }) => (
  <ListWidget
    title="Trending"
    movies={['Thor: Ragnarok', 'Thor: Ragnarok', 'Thor: Ragnarok', 'Thor: Ragnarok']}
    history={history}
  />
);

Home.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Home;
