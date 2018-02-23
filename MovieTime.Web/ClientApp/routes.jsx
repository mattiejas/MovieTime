import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './views/Home';
import MovieDetailView from './views/movie/MovieDetailView';
import NotFoundView from './views/notfound/NotFoundView';

export const routes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/movie/detail" component={MovieDetailView} />
      <Route component={NotFoundView} />
    </Switch>
  </Layout>
);

export default routes;
