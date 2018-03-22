import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import auth from './firebase';
import { setAuthenticated, setUnauthenticated } from './modules/auth';
import { getUserData } from './utils/user';

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

class Routes extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    setAuthenticated: PropTypes.func.isRequired,
    setUnauthenticated: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      watchAuthentication: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (this.state.watchAuthentication) {
        if (user) {
          getUserData(user.uid).then((data) => {
            this.props.setAuthenticated({ ...data, id: user.uid });
          });
        } else {
          this.props.setUnauthenticated();
        }
      }
    });
  }

  watchAuthenticationStateChange(shouldWatch = true) {
    this.setState({
      watchAuthentication: shouldWatch,
    });
  }

  render() {
    return (
      <Layout
        userId={this.state.userId}
      >
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
              <Registration
                watchAuthenticationStateChange={shouldWatch =>
                  this.watchAuthenticationStateChange(shouldWatch)}
                {...props}
              />
            )}
          />
          <PublicRoute
            path="/login"
            isAuthenticated={this.props.isAuthenticated}
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  setAuthenticated,
  setUnauthenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
