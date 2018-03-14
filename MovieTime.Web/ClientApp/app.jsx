import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import history from './utils/history';

const App = ({ baseUrl }) => (
  <BrowserRouter basename={baseUrl}>
    <Router history={history} />
  </BrowserRouter>
);

export default App;
