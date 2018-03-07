import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { auth } from '../../firebase';
import { Navigation } from '../navigation/Navigation';

import styles from './Layout.scss';

class Layout extends Component {
  state = {
    authUser: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authUser: user });
      }
    });
  }

  render() {
    console.log('this', this.state);
    return (
      <div>
        <Navigation authUser={this.state.authUser} />
        {this.props.children}
      </div>
    );
  }
}

// const Layout = props => (
//   <div>
//     <Navigation />
//     {props.children}
//   </div>
// );

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
