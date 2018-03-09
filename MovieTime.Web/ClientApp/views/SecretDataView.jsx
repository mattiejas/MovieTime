import React, { Component } from 'react';
import { getUser, getRequestHeaderForCurrentUser } from '../utils/auth';

const API = '/auth/secretdata/';

class SecretDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretData: '',
    };
  }
  
  componentDidMount() {
    getRequestHeaderForCurrentUser()
      .then(requestHeaders => {
          fetch(API, { method: 'get', headers: requestHeaders })
            .then(result => result.json() )
            .then(data => this.setState({ secretData: data.secret }));
      })
      .catch((err) => {
        this.setState({ secretData: "You are not logged in! Please log in to view the secret!" });
        console.log('err', err);
      });
  }

  render() {
    const mySecret = this.state.secretData;
    return (
      <div>
        <h2> Hello: {mySecret}</h2>
      </div>
    );
  }
}

export default SecretDataView;