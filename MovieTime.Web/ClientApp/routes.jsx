import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { auth } from './firebase';
import Layout from './components/layout/Layout';
import Home from './views/Home';
import MovieDetailView from './views/movie/MovieDetailView';
import NotFoundView from './views/notfound/NotFoundView';
import RegistrationForm from './views/RegistrationForm/RegistrationForm';
import Protected from './views/Protected';
import Login from './views/login/Login';
import SecretDataView from './views/SecretDataView';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: "/login", state: { from: props.location }}} />
      }
    />
  )
};

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to="/" />
      }
    />
  )
};

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false })
      }
    });
  }

  render() {
    return (
      <Layout isAuthenticated={this.state.isAuthenticated}>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/movie/detail/:title" isAuthenticated={this.state.isAuthenticated} component={MovieDetailView} />
          <PublicRoute path="/register" isAuthenticated={this.state.isAuthenticated} component={RegistrationForm} />
          <PublicRoute path="/login" isAuthenticated={this.state.isAuthenticated} component={Login} />
          <PrivateRoute path="/protected" isAuthenticated={this.state.isAuthenticated} component={Protected} />
          <Route path="/secretdata" isAuthenticated={this.state.isAuthenticated} component={SecretDataView} />
          <Route component={NotFoundView} />
        </Switch>
      </Layout>
    );
  }
}

export const routes = (
  <Router />
);

// export default routes;
