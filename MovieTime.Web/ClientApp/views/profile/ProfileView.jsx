import React from 'react';
import PropTypes from 'prop-types';

import auth from '../../firebase';
import { getUserData, updateUserData } from '../../utils/user';
// import { getUser } from '../../utils/auth';

import ListWidget from '../../components/list-widget/ListWidget';
import Placeholder from '../../components/placeholder/Placeholder';
import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';
import EditProfileModal from '../../components/profile/EditProfileModal';

import styles from './ProfileView.scss';

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      canEditProfile: false,
      user: {},
      isLoading: true,
      isEditing: false,
      movies: [
        'Thor: Ragnarok',
        'Thor: Ragnarok',
        'Thor: Ragnarok',
        'Thor: Ragnarok',
        'Thor: Ragnarok',
      ],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.displayUserData(id);
    // this.getProfileCanBeEdited();

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          canEditProfile: user.uid === id,
        });
      } else {
        this.setState({ canEditProfile: false });
      }
    });
  }

  componentWillUpdate() {}

  onEdit() {
    this.setState({
      isEditing: true,
    });
  }

  onDiscard() {
    this.setState({
      isEditing: false,
    });
  }

  // getProfileCanBeEdited() {
  //   const { id } = this.props.match.params;

  //   return getUser()
  //     .then((user) => {
  //       console.log('user', user);
  //       if (user) {
  //         this.setState({ canEditProfile: user.uid === id });
  //       }
  //     });
  // }

  displayUserData(id) {
    getUserData(id)
      .then((data) => {
        this.setState({
          user: data,
          isLoading: false,
        });
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  render() {
    const { firstName = '', lastName = '' } = this.state.user;
    const { canEditProfile } = this.state;
    const { id } = this.props.match.params;

    // const styleForEditButton = canEditProfile ? '' : styles.hidden;

    return (
      <div className={styles.view}>
        <EditProfileModal
          hidden={!this.state.isEditing}
          hideModal={() => this.onDiscard()}
          onUpdate={user =>
                        updateUserData(user, id).then(() => {
                            this.displayUserData(id);
                        })}
          user={this.state.user}
        />
        <div className={styles.view__background} />
        <div className={styles.view__header}>
          <div className={styles.header}>
            <div className={styles.header__picture}>
              <ProfilePicture
                className={styles.picture}
                source={`/assets/users/${id}.png`}
              />
            </div>
            <div className={styles.header__content}>
              <div className={styles.name}>
                <Placeholder isReady={!this.state.isLoading}>
                  <h1>{`${firstName} ${lastName}`}</h1>
                  <h3>
                                        has watched ... movies worthy of ... hours and ... minutes
                  </h3>
                </Placeholder>
              </div>
            </div>
          </div>
          <div className={styles.buttons__container}>
            <div className={styles.buttons}>
              {canEditProfile &&
              <Button
                dark
                icon="pencil"
                onClick={() => this.onEdit()}
              >
                                    Edit
              </Button>}
              {/* <Button dark icon="user">Follow</Button> */}
            </div>
          </div>
          <div className={styles.content}>
            <ListWidget
              title="Wants to watch"
              movies={this.state.movies}
              history={this.props.history}
            />
            <ListWidget
              title="Has watched"
              movies={this.state.movies}
              history={this.props.history}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProfileView.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileView;
