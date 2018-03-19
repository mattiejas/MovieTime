import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { logout } from '../../utils/auth';

import Icon from '../icon/Icon';
import Button from '../button/Button';
import ButtonGroup from '../button/ButtonGroup';
import SearchInput from '../input/SearchInput';

import styles from './Navigation.scss';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuIsVisible: false,
      inTransition: false,
      searchIsOpen: false,
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

  toggleSearch() {
    this.setState({
      searchIsOpen: !this.state.searchIsOpen,
    });
  }

  render() {
    return (
      <div className={cn(styles.navigation)}>
        {this.props.isAuthenticated === true ?
          (
            <div className={styles.navigation__wrapper}>
              <div className={styles.title}><Link to="/" href="/">Movie<span>Time</span></Link></div>
              <button className={styles['nav-button']} onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
              <ul className={
                cn(
                  this.state.mobileMenuIsVisible ? '' : styles['navigation--hidden'],
                  this.state.inTransition ? styles['navigation--transistion'] : '',
                )
              }
              >
                <li className={styles['search-mobile']}><SearchInput onSearch={() => this.toggleMenu()} /></li>
                <li>
                  <NavLink
                    exact
                    activeClassName={styles['navigation__item--active']}
                    to="/"
                    onClick={() => this.toggleMenu()}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName={styles['navigation__item--active']}
                    to="/movies/Spider-Man: Homecoming"
                    onClick={() => this.toggleMenu()}
                  >
                    Spider-Man: Homecoming
                  </NavLink>
                </li>
                <li className={styles['logout-mobile']}>
                  <ButtonGroup>
                    <Button icon="user" to={`/users/${this.props.user.id}`}>
                      {`${this.props.user.firstName} ${this.props.user.lastName}`}
                    </Button>
                    <Button icon="power-off" onClick={() => logout()} />
                  </ButtonGroup>
                </li>
              </ul>

              <div className={styles.buttons}>
                <SearchInput
                  className={cn(styles['search-desktop'], this.state.searchIsOpen ? styles['is-open'] : null)}
                  onClick={() => this.toggleSearch()}
                />
                <ButtonGroup>
                  <Button icon="user" to={`/users/${this.props.user.id}`}>
                    {`${this.props.user.firstName} ${this.props.user.lastName}`}
                  </Button>
                  <Button icon="power-off" onClick={() => logout()} />
                </ButtonGroup>
              </div>
            </div>
          ) : (
            <div className={styles.navigation__wrapper}>
              <div className={styles.title}><Link to="/" href="/">Movie<span>Time</span></Link></div>
              <button className={styles['nav-button']} onClick={() => this.toggleMenu()}><Icon type="bars" /></button>
              <ul className={cn(
                this.state.mobileMenuIsVisible ? '' : styles['navigation--hidden'],
                this.state.inTransition ? styles['navigation--transistion'] : '',
              )}
              >
                <li>
                  <NavLink
                    exact
                    activeClassName={styles['navigation__item--active']}
                    to="/"
                    onClick={() => this.toggleMenu()}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName={styles['navigation__item--active']}
                    to="/register"
                    onClick={() => this.toggleMenu()}
                  >
                    Register
                  </NavLink>
                </li>
                <li className={styles['login-mobile']}>
                  <Button icon="user" to="/login">Login</Button>
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
  user: PropTypes.objectOf(PropTypes.any),
  isAuthenticated: PropTypes.bool.isRequired,
};

