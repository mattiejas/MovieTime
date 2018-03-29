import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import styles from './Table.scss';

const Table = ({ headers, rows, onRowClicked }) => (
  <div className={styles['table-wrapper']}>
    <table className={styles.table}>
      <thead>
        <tr>
          {
            _.map(headers, (heading, i) => (<th key={`header-data--${i}`}>{heading.columnName}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          _.map(rows, (row, i) => (
            <tr key={`table-row--${i}`} onClick={() => onRowClicked(row)}>
              {
                  _.forEach(headers, (heading, j) => <td key={`table-data--${j}`}>{row[heading.objectPropertyName]}</td>)
              }
            </tr>))
        }
      </tbody>
    </table>
  </div>
);

// Row
  // items
// {
//     console.log(row);
//     console.log(heading.objectPropertyName, ' === ', row.key);
//
//     if (heading.objectPropertyName === row.key) {
//         return <td key={`table-data--${j}`}>{item[heading.objectPropertyName]}</td>;
//     }
//     return <span />;
// });

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  onRowClicked: PropTypes.func,
};

Table.defaultProps = {
  onRowClicked: undefined,
};

export default Table;
