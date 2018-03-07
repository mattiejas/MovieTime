import React, { Component } from 'react';
import { auth } from '../firebase';

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  // state = {
  //   user: null,
  // };

  // componentDidMount() {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user });
  //     }
  //   });
  // }

  render() {
    // const user = auth.currentUser;
    // if (user) {
    //   console.log('signed in');
    // } else {
    //   console.log('not signed in');
    // }

    console.log('state', this.props.authUser);

    let name = '';
    if (this.props.authUser) {
      name = this.props.authUser.email;
    } else {
      name = 'Unknown people';
    }

    return (
      <div>
        Hello {name}
      </div>
    )
  }
}

export default Test;
