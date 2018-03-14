import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';

const Layout = props => (
  <div>
    <Navigation isAuthenticated={props.isAuthenticated} />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Layout;
