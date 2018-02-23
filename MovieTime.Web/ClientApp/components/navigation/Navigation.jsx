
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './Navigation.scss';
import Icon from '../icon/Icon';

export class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      mobileMenuIsVisible: false,
      inTransition: false,
    };
  }

  toggleMenu() {
    this.setState({
      mobileMenuIsVisible: !this.state.mobileMenuIsVisible,
      inTransition: true,
    });

    setTimeout(() => {
      this.setState({
        inTransition: false,
      });
    }, 200);
  }

  render() {
    return (
      <div className={cn(styles.navigation)}>
        <div className={styles.title}>Movie<span>Time</span></div>
        <button onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
        <ul className={cn(
          this.state.mobileMenuIsVisible ? '' : styles['navigation--hidden'],
          this.state.inTransition ? styles['navigation--transistion'] : '',
        )}
        >
          <li><NavLink exact activeClassName={styles['navigation__item--active']} to="/" onClick={() => this.toggleMenu()}>Home</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/some" onClick={() => this.toggleMenu()}>Some</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/sample-data" onClick={() => this.toggleMenu()}>Sample Data</NavLink></li>
          <li><NavLink activeClassName={styles['navigation__item--active']} to="/movie/detail" onClick={() => this.toggleMenu()}>Movie Detail</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
