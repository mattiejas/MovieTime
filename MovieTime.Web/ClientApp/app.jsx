import React from 'react';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';

import Routes from './routes';
import history from './utils/history';
import reducers from './modules';

// eslint-disable-next-line no-underscore-dangle

const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, middleware)),
);

const App = ({ baseUrl }) => (
  <Provider store={store}>
    <ConnectedRouter basename={baseUrl} history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default App;
