import React, {Component} from 'react';
import classnames from 'classnames';

import {Button} from '../button/Button';
import styles from './Navigation.scss';

export class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      menuIsVisible: true,
    };
  }

  toggleMenu() {
    console.log('opening menu...');
    this.setState({
      menuIsVisible: !this.state.menuIsVisible,
    });
  }

  render() {
    return (
      <div className={classnames(styles.navigation)}>
        <button className={styles.navButton} onClick={() => this.toggleMenu()}><i className="fa fa-bars" /></button>
        <ul className={this.state.menuIsVisible ? '' : 'hidden'}>
          <li>Home</li>
          <li>Counter</li>
          <li>Fetch Data</li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
