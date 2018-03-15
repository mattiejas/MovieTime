import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { logout } from '../../utils/auth';
import Button from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import Icon from '../icon/Icon';

import styles from './Navigation.scss';

export default class Navigation extends Component {
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
        {this.props.isAuthenticated === true ?
          (
            <div className={styles.navigation__wrapper}>
              <div className={styles.title}>Movie<span>Time</span></div>
              <button className={styles['nav-button']} onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
              <ul className={
                cn(
                  this.state.mobileMenuIsVisible ? '' : styles['navigation--hidden'],
                  this.state.inTransition ? styles['navigation--transistion'] : '',
                )
              }
              >
                <li>
                  <NavLink
                    exact
                    to="/"
                    onClick={() => this.toggleMenu()}
                    activeClassName={styles['navigation__item--active']}
                  >
                  Home
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName={styles['navigation__item--active']} to="/404" onClick={() => this.toggleMenu()}>
                    404
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => this.toggleMenu()}
                    to="/movies/ferris bueller's day off"
                    activeClassName={styles['navigation__item--active']}
                  >
                    Movie Detail
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName={styles['navigation__item--active']} to="/protected" onClick={() => this.toggleMenu()}>
                    Protected
                  </NavLink>
                </li>
              </ul>
              <div className={styles.buttons}>
                <ButtonGroup>
                  <Button icon="user" to="/users/2">Eddie Brock</Button>
                  <Button icon="power-off" onClick={() => logout()} />
                </ButtonGroup>
              </div>
            </div>
          ) : (
            <div className={styles.navigation__wrapper}>
              <div className={styles.title}>Movie<span>Time</span></div>
              <button className={styles['nav-button']} onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
              <ul className={cn(
                this.state.mobileMenuIsVisible ? '' : styles['navigation--hidden'],
                this.state.inTransition ? styles['navigation--transistion'] : '',
              )}
              >
                <li>
                  <NavLink exact activeClassName={styles['navigation__item--active']} to="/" onClick={() => this.toggleMenu()}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName={styles['navigation__item--active']} to="/404" onClick={() => this.toggleMenu()}>
                    404
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName={styles['navigation__item--active']} to="/register" onClick={() => this.toggleMenu()}>
                    Register
                  </NavLink>
                </li>
              </ul>
              <div className={styles.buttons}>
                <Button icon="user" to="/login">Login</Button>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

