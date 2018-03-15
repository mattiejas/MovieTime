import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './utils/history';

const App = ({ baseUrl }) => (
  <Router basename={baseUrl} history={history}>
    <Routes />
  </Router>
);

App.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default App;
