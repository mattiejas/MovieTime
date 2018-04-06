/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cn from 'classnames';
import _ from 'lodash';

import { getCommentsByUser, getCommentsOnMovie, postCommentOnMovie } from '../../utils/movie';

import Text from '../input/Text';
import Button from '../button/Button';
import Spinner from '../spinner/Spinner';
import Comment from './Comment';

import styles from './CommentSection.scss';
import SpoilerWarning from './SpoilerWarning';

const MAX_LENGTH = 2000;

class CommentSection extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['movie', 'user']).isRequired,
    title: PropTypes.string.isRequired,
    showSpoilerWarning: PropTypes.bool,
    id: PropTypes.string,
  };

  static defaultProps = {
    id: undefined,
    showSpoilerWarning: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      input: '',
      comments: [],
      isLoading: true,
      showSpoilerWarning: props.showSpoilerWarning,
    };
  }

  componentDidMount() {
    if (this.props.id) {
      this.fetchComments(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      this.fetchComments(nextProps.id);
    }

    this.setState({
      showSpoilerWarning: nextProps.showSpoilerWarning,
    });
  }

  onCommentInput(val) {
    this.setState({
      input: val,
    });
  }

  fetchComments(id) {
    const now = moment();
    if (this.props.type === 'movie') {
      getCommentsOnMovie(id)
        .then((comments) => {
          this.setState({
            comments: _.orderBy(comments, c => (moment(c.date).diff(now)), 'desc'),
            isLoading: false,
          });
        });
    } else {
      getCommentsByUser(id)
        .then((comments) => {
          this.setState({
            comments: _.orderBy(comments, c => (moment(c.date).diff(now)), 'desc').slice(0, 5),
            isLoading: false,
          });
        });
    }
  }

  postComment() {
    if (this.state.input !== '' && this.state.input.length <= MAX_LENGTH) {
      postCommentOnMovie(this.props.id, this.state.input)
        .then(() => this.fetchComments(this.props.id));

      this.setState({
        isLoading: true,
        input: '',
      });
    }
  }

  hideSpoiler() {
    this.setState({
      showSpoilerWarning: false,
    });
  }

  render() {
    if (this.props.type === 'user' && this.state.comments.length === 0) {
      return <div />;
    }

    if (this.state.showSpoilerWarning) {
      return (<SpoilerWarning
        onClick={() => this.hideSpoiler()}
      />);
    }

    return (
      <div className={cn(styles.wrapper, this.props.type === 'movie' ? styles.movie : styles.user)}>
        <h4>{this.props.title}</h4>
        <div className={styles['comment-section']}>
          <div className={styles.content}>
            {
              this.props.type === 'movie' &&
              (
              <div className={styles['place-comment']}>
                <div className={styles['input-container']}>
                  <Text
                    className={styles['comment-input']}
                    placeholder="Place a comment..."
                    onChange={val => this.onCommentInput(val)}
                  >
                    {this.state.input}
                  </Text>
                  <span
                    className={this.state.input.length > MAX_LENGTH ? styles.error : null}
                  >
                    {this.state.input.length} / {MAX_LENGTH}
                  </span>
                </div>
                <Button
                  dark
                  onClick={() => this.postComment()}
                >
                    Post
                </Button>
              </div>
              )
            }
            {
              (this.state.comments.length > 0 || this.state.isLoading) &&
              (
                <div>
                  {
                    this.type === 'movie' &&
                    <hr />
                  }
                  <Spinner hidden={!this.state.isLoading} />
                  {
                    this.state.comments.length > 0 &&
                      _.map(this.state.comments, (comment, key) =>
                        (<Comment
                          title={
                            this.props.type === 'movie' ?
                              comment.user.id === 'deleted' ?
                                '[deleted]' : `${comment.user.firstName} ${comment.user.lastName}` :
                                comment.movie.title
                          }
                          date={moment(comment.date).format('YYYY/MM/DD HH:mm:ss')}
                          comment={comment.value}
                          linkTo={this.props.type === 'movie' ?
                            comment.user.id === 'deleted' ?
                            null : `/users/${comment.user.id}` :
                            `/movies/${comment.movie.id}`}
                          key={key}
                        />))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CommentSection;
