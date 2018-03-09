import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './styles/index.scss';
import App from "./app";

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing
  // configuration and injects the app into a DOM element.
  const baseUrl = document
    .getElementsByTagName('base')[0]
    .getAttribute('href');

  ReactDOM.render(
    <AppContainer>
      <App baseUrl={baseUrl} />
    </AppContainer>,
    document.getElementById('react-app'),
  );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept(() => {
    // module.hot.accept('./routes', () => {
    // routes = require('./routes'); // eslint-disable-line global-require
    renderApp();
  });
}
