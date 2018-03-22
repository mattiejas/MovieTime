import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navigation from '../navigation/Navigation';
import { getUserData } from '../../utils/user';

class Layout extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    if (this.props.isAuthenticated && this.props.userId) {
      this.updateUser(this.props.userId);
    }
  }

  componentWillReceiveProps(props) {
    if (props.isAuthenticated && props.userId) {
      this.updateUser(props.userId);
    } else {
      this.setState({
        user: null,
      });
    }
  }

  updateUser(userId) {
    getUserData(userId)
      .then((user) => {
        this.setState({
          user: {
            ...user,
            id: userId,
          },
        });
      });
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool,
  userId: PropTypes.string,
};

Layout.defaultProps = {
  userId: null,
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Layout);
