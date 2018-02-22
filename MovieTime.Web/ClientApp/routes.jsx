import * as React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './views/Home';
import MovieDetailView from './views/MovieDetailView';

export const routes = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/movie/detail" component={MovieDetailView} />
  </Layout>
);

export default routes;
