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

const PrivateRoute = ({ component: Component, authUser, ...rest }) => {
  console.log('bla');
  console.log(authUser);

  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
};

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    console.log('mounting');
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authUser: user });
      }
    });
  }

  render() {
    console.log('render');
    return (
      <Layout authUser={this.state.authUser}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movie/detail/:title" component={MovieDetailView} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/login" render={() => ( <Login authUser={this.state.authUser} /> )} />
          <PrivateRoute path="/protected" authUser={this.state.authUser} component={Protected} />
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
