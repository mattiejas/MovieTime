import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './views/Home';
import MovieDetailView from './views/movie/MovieDetailView';
import ProfileView from './views/profile/ProfileView';
import NotFoundView from './views/notfound/NotFoundView';

export const routes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/movies/detail/:title" component={MovieDetailView} />
      <Route path="/users/:id" component={ProfileView} />
      <Route component={NotFoundView} />
    </Switch>
  </Layout>
);

export default routes;
