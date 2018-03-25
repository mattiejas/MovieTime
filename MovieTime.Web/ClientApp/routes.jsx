import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import auth from './firebase';
import { authenticateById, unauthenticate } from './modules/auth';

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
        : <Redirect to="/" />)}
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

class Routes extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    authenticateById: PropTypes.func.isRequired,
    unauthenticate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.authenticateById(user.uid);
      } else {
        this.props.unauthenticate();
      }
    });
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/movies/:title"
            isAuthenticated={this.props.isAuthenticated}
            component={MovieDetailView}
          />
          <PublicRoute
            path="/register"
            isAuthenticated={this.props.isAuthenticated}
            component={props => (
              <Registration {...props} />
            )}
          />
          <PublicRoute
            path="/login"
            isAuthenticated={this.props.isAuthenticated}
            component={props => (
              <Login {...props} />
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  authenticateById,
  unauthenticate,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
