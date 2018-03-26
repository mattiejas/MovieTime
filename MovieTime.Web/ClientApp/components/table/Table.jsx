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
            _.map(headers, (heading, i) => (<th key={`header-data--${i}`}>{heading}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          _.map(rows, (row, i) => (
            <tr key={`table-row--${i}`}>
              {
                _.map(row, (item, j) => <td key={`table-data--${j}`}>{item}</td>)
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
