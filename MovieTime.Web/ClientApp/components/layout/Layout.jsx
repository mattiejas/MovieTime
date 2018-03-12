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
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
