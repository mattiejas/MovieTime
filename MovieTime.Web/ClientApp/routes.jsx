import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './views/Home';
import MovieDetailView from './views/movie/MovieDetailView';
import NotFoundView from './views/notfound/NotFoundView';
import RegistrationForm from './views/RegistrationForm/RegistrationForm';
import Test from './views/Test';

export const routes = (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/movie/detail/:title" component={MovieDetailView} />
      <Route path="/register" component={RegistrationForm} />
      <Route path="/test" component={Test} />
      <Route component={NotFoundView} />
    </Switch>
  </Layout>
);

export default routes;
