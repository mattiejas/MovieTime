import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './Comment.scss';

const Comment = ({
  linkTo, title, date, comment,
}) => (
  <div className={styles.comment}>
    <h3>
      <Link to={linkTo} href={linkTo}>{title}</Link>
    </h3>
    <span>{date}</span>
    <p>{comment}</p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default Comment;
