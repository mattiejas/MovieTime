
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './Navigation.scss';
import Icon from '../icon/Icon';
import Button from "../button/Button";
import ButtonGroup from "../button/ButtonGroup";

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
        <div className={styles.navigation__wrapper}>
          <div className={styles.title}>Movie<span>Time</span></div>
          <button onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
          <ul className={cn(
            this.state.mobileMenuIsVisible ? '' : styles['navigation--hidden'],
            this.state.inTransition ? styles['navigation--transistion'] : '',
          )}
          >
            <li><NavLink exact activeClassName={styles['navigation__item--active']} to="/" onClick={() => this.toggleMenu()}>Home</NavLink></li>
            <li><NavLink activeClassName={styles['navigation__item--active']} to="/404" onClick={() => this.toggleMenu()}>404</NavLink></li>
            <li><NavLink activeClassName={styles['navigation__item--active']} to="/movies/detail/ferris bueller's day off" onClick={() => this.toggleMenu()}>Movie Detail</NavLink></li>
            <li><NavLink activeClassName={styles['navigation__item--active']} to="/users/2" onClick={() => this.toggleMenu()}>User 2</NavLink></li>
          </ul>
          <div className={styles.buttons}>
            <Button icon="user">Login</Button>
            <ButtonGroup>
              <Button icon="user">Eddie Brock</Button>
              <Button icon="power-off" />
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
