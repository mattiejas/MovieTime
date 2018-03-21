import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';

import Routes from './routes';
import history from './utils/history';
import rootReducer from './modules';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const App = ({ baseUrl }) => (
  <Provider store={store}>
    <Router basename={baseUrl} history={history}>
      <Routes />
    </Router>
  </Provider>
);

App.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default App;
