import React from 'react';
import { auth } from '../firebase';

const Protected = props => (
  <div>
    <h2>Protected route</h2>
    Hello {props.authUser ? props.authUser.email : 'Unknown person' }
  </div>
);

export default Protected;
