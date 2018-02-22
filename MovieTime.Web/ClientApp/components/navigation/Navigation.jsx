import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import styles from './Navigation.scss';
import Icon from '../icon/Icon';

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
        <button onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
        <ul className={this.state.menuIsVisible ? '' : styles['navigation--hidden']}>
          <li><NavLink exact activeClassName={styles['navigation__item--active']} to="/">Home</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/some">Some</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/sample-data">Sample Data</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/movie/detail">Movie Detail</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
