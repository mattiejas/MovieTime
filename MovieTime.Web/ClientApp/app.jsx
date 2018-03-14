import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Router from './routes';

const App = ({ baseUrl }) => (
  <BrowserRouter basename={baseUrl}>
    <Router />
  </BrowserRouter>
);

App.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default App;
