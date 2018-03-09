import React from 'react';
import cn from 'classnames';

import styles from './NotFoundView.scss';

const NotFoundView = () => (
  <div>
    <div className={styles.background} />
    <div className={cn(styles.notfound)}>
      <h1>Oops</h1>
      <hr />
      <p>The requested link could not be found.</p>
      <img className={cn('image', styles.link)} src="assets/link.png" alt="link not found" />
    </div>
  </div>
);

export default NotFoundView;
