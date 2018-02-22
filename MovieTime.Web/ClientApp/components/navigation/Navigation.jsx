import React, {Component} from 'react';
import classnames from 'classnames';

import {Button} from '../button/Button';
import styles from './Navigation.scss';
import {NavLink} from "react-router-dom";

export class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      menuIsVisible: true,
    };
  }

  toggleMenu() {
    this.setState({
      menuIsVisible: !this.state.menuIsVisible,
    });
  }

  render() {
    return (
      <div className={classnames(styles.navigation)}>
        <div className={styles.title}>Movie<span>Time</span></div>
        <button onClick={() => this.toggleMenu()}><i className="fa fa-bars" /></button>
        <ul className={this.state.menuIsVisible ? '' : styles['navigation--hidden']}>
          <li><NavLink exact activeClassName={styles['navigation__item--active']} to="/">Home</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/some">Some</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/sample-data">Sample Data</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
