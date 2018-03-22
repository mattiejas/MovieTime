import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';

const Layout = ({ children }) => (
  <div>
    <Navigation />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
