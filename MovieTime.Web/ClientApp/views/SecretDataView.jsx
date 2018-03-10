import React, { Component } from 'react';

const API = '/auth/secretdata/';

class SecretDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretData: '',
    };
  }
  
  componentDidMount() {
    fetch(API)
      .then((data) => {
        console.log('response from json', data);
        this.setState({ secretData: data });
      })
      .catch((err) => {
        console.log('my error', err);
      });
  }

  render() {
    const mySecret = this.state.secretData;
    console.log('my secret', mySecret);
    return (
      <div>
        <h2>Can you keep my story a secret?</h2>
      </div>
    );
  }
}

export default SecretDataView;