import React from 'react';

import Table from '../../components/table/Table';
import Icon from '../../components/icon/Icon';

import styles from './ListView.scss';

function handleClick() {
  // Hello there!
}

const ListView = () => (
  <div>
    <div className={styles.view__background} />
    <div className={styles.view__content}>
      <h4>Peter Parker wants to watch</h4>
      <Table
        headers={['Title', 'Year', 'Length', 'Genre', 'Rating', <Icon type="eye" />]}
        rows={[
          [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ], [
            'Thor: Ragnarok',
            '2017',
            '130 min',
            'Comedy',
            <span>4/5 <Icon type="star" /></span>,
            <Icon type="eye-slash" onClick={handleClick} />,
          ],
        ]}
      />
    </div>
  </div>
);

export default ListView;
