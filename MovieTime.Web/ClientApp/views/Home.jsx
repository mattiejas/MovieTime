import React from 'react';
import Button from '../components/button/Button';
import { removeUser } from '../utils/auth';


export default class Home extends React.Component {
  async handleClick(event) {
    event.preventDefault();
    const response = await removeUser('devopsproj');
  }

  render() {
    return (
      <Button onClick={this.handleClick} dark>Remove Me From Your System</Button>
    );
  }
}
