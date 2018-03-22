import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import auth from './firebase';
import { setAuthenticated, setUnauthenticated } from './modules/auth';
import { getUserData } from './utils/user';
import { logout } from './utils/auth';

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
    setAuthenticated: PropTypes.func.isRequired,
    setUnauthenticated: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserData(user.uid).then((data) => {
          this.props.setAuthenticated({ ...data, id: user.uid });
        }).catch(() => logout());
      } else {
        this.props.setUnauthenticated();
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
  setAuthenticated,
  setUnauthenticated,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
