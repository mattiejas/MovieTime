import React, { Component } from 'react';

const API = '/auth/secretdata/';

export class SecretDataView extends React.Component {

    state = {
        secretdata: {},
    }

 componentDidMount() {
     fetch(API).
       then((response) => response.json()).then((data) => {
         console.log('about to set secretdata to state');
        this.setState({
            secretdata: data,
        });
    });
}

  render() {
    const mySecret = this.state.secretdata;
    console.log('render from secretview called');
      return (
            <div> {mySecret}</div>
        );
    }
}

export default SecretDataView;