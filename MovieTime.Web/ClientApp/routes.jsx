import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import auth from './firebase';

import Layout from './components/layout/Layout';

import Home from './views/home/Home';
import Login from './views/login/Login';
import ProfileView from './views/profile/ProfileView';
import NotFoundView from './views/notfound/NotFoundView';
import MovieDetailView from './views/movie/MovieDetailView';
import ListView from './views/list/ListView';
import Registration from './views/registration/Registration';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated === true
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />)}
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
    render={props =>
      (isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to={(props.location.state && props.location.state.from) || '/'} />)}
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
      isAuthenticated: false,
      userId: null,
      watchAuthentication: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (this.state.watchAuthentication) {
        if (user) {
          this.setState({
            isAuthenticated: true,
            userId: user.uid,
          });
        } else {
          this.setState({
            isAuthenticated: false,
            userId: null,
          });
        }
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.watchAuthentication === nextState.watchAuthentication;
  }

  watchAuthenticationStateChange(shouldWatch = true) {
    this.setState({
      watchAuthentication: shouldWatch,
    });
  }

  render() {
    return (
      <Layout
        isAuthenticated={this.state.isAuthenticated}
        userId={this.state.userId}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/movies/:title"
            isAuthenticated={this.state.isAuthenticated}
            component={MovieDetailView}
          />
          <PublicRoute
            path="/register"
            isAuthenticated={this.state.isAuthenticated}
            component={props => (
              <Registration
                watchAuthenticationStateChange={shouldWatch =>
                                    this.watchAuthenticationStateChange(shouldWatch)}
                {...props}
              />
                        )}
          />
          <PublicRoute
            path="/login"
            isAuthenticated={this.state.isAuthenticated}
            component={props => (
              <Login
                watchAuthenticationStateChange={shouldWatch =>
                                    this.watchAuthenticationStateChange(shouldWatch)}
                {...props}
              />
                        )}
          />
          <Route path="/list" component={ListView} />
          <Route path="/users/:id" component={ProfileView} />
          <Route component={NotFoundView} />
        </Switch>
      </Layout>
    );
  }
}

export const routes = <Router />;
