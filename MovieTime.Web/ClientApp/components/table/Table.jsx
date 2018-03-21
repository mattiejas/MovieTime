import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import styles from './Table.scss';

const Table = ({ headers, rows }) => (
  <div className={styles['table-wrapper']}>
    <table className={styles.table}>
      <thead>
        <tr>
          {
            _.map(headers, (heading, i) => (<th key={i}>{heading}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          _.map(rows, row => (
            <tr>
              {
                _.map(row, (item, i) => <td key={i}>{item}</td>)
              }
            </tr>))
        }
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
};

export default Table;
