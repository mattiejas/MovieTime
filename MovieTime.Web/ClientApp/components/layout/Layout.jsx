import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../navigation/Navigation';
import { getUserData } from '../../utils/user';

class Layout extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    if (this.props.isAuthenticated && this.props.userId) {
      this.updateUser();
    }
  }

  componentWillReceiveProps(props) {
    if (props.isAuthenticated && props.userId) {
      this.updateUser();
    } else {
      this.setState({
        user: null,
      });
    }
  }

  updateUser() {
    getUserData(this.props.userId)
      .then((user) => {
        this.setState({
          user: {
            ...user,
            id: this.props.userId,
          },
        });
      });
  }

  render() {
    return (
      <div>
        <Navigation isAuthenticated={!!this.state.user} user={this.state.user} />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string,
};

Layout.defaultProps = {
  userId: null,
};

export default Layout;
