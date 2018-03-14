import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { auth } from './firebase';
import Layout from './components/layout/Layout';

import Home from './views/Home';
import MovieDetailView from './views/movie/MovieDetailView';
import ProfileView from './views/profile/ProfileView';
import NotFoundView from './views/notfound/NotFoundView';
import RegistrationForm from './views/registration/Registration';
import Protected from './views/Protected';
import Login from './views/login/Login';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

PrivateRoute.defaultProps = {
  location: undefined,
};

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to="/" />)
      }
  />
);

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

PublicRoute.defaultProps = {
  location: undefined,
};

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }

  render() {
    if (this.state.isAuthenticated === null) {
      return null;
    }
    return (
      <Layout isAuthenticated={this.state.isAuthenticated}>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/movie/detail/:title" isAuthenticated={this.state.isAuthenticated} component={MovieDetailView} />
          <PublicRoute path="/register" isAuthenticated={this.state.isAuthenticated} component={RegistrationForm} />
          <PublicRoute path="/login" isAuthenticated={this.state.isAuthenticated} component={Login} />
          <PrivateRoute path="/protected" isAuthenticated={this.state.isAuthenticated} component={Protected} />
          <Route path="/users/:id" component={ProfileView} />
          <Route component={NotFoundView} />
        </Switch>
      </Layout>
    );
  }
}

export const routes = (
  <Router />
);
