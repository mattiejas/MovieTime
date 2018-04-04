import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import styles from './Table.scss';

const Table = ({ headers, rows, onRowClick }) => (
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
            <tr key={`table-row--${i}`} onClick={() => onRowClick(row)} style={{ cursor: onRowClick ? 'pointer' : null }}>
              {
                _.map(Object.keys(headers), (heading, j) => <td key={`table-data--${j}`}>{row[heading]}</td>)
              }
            </tr>))
        }
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  headers: PropTypes.objectOf(PropTypes.any).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  onRowClick: PropTypes.func,
};

Table.defaultProps = {
  onRowClick: undefined,
};

export default Table;
