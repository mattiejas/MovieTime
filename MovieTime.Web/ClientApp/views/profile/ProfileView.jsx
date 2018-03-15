import React from 'react';
import PropTypes from 'prop-types';
import { getUserData, updateUserData } from '../../utils/user';


import ListWidget from '../../components/list-widget/ListWidget';
import Placeholder from '../../components/placeholder/Placeholder';
import Button from '../../components/button/Button';
import ProfilePicture from '../../components/profile/ProfilePicture';
import EditProfileModal from '../../components/user/EditProfileModal';


import styles from './ProfileView.scss';


class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
      isEditing: false,
      movies: ['Thor: Ragnarok', 'Thor', 'Black Panther', 'Spider-Man: Homecoming', 'Thor: Ragnarok'],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getUserData(id).then((data) => {
      this.setState({
        user: { id, ...data },
        isLoading: false,
      });
    });
  }

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

  render() {
    const { firstName = '', lastName = '' } = this.state.user;
    const { id } = this.props.match.params;
    return (
      <div className={styles.view}>
        <EditProfileModal
          hidden={!this.state.isEditing}
          hideModal={() => this.onDiscard()}
          onUpdate={user => updateUserData(user).then(() => {
              getUserData(user.id);
          })}
          user={this.state.user}
        />
        <div className={styles.view__background} />
        <div className={styles.view__header}>
          <div className={styles.header}>
            <div className={styles.header__picture}>
              <ProfilePicture className={styles.picture} source={`/assets/users/${id}.png`} />
            </div>
            <div className={styles.header__content}>
              <div className={styles.name}>
                <Placeholder isReady={!this.state.isLoading}>
                  <h1>{`${firstName} ${lastName}`}</h1>
                  <h3>has watched 42 movies worthy of 66 hours and 420 minutes</h3>
                </Placeholder>
              </div>
            </div>
          </div>
          <div className={styles.buttons__container}>
            <div className={styles.buttons}>
              <Button dark icon="pencil" onClick={() => this.onEdit()}>Edit</Button>
              <Button dark icon="user">Follow</Button>
            </div>
          </div>
          <div className={styles.content}>
            <ListWidget title="Wants to watch" movies={this.state.movies} history={this.props.history} />
            <ListWidget title="Has watched" movies={this.state.movies} history={this.props.history} />
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
