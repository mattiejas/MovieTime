import PropTypes from 'prop-types';
import React from 'react';

import styles from './Placeholder.scss';

class ParagraphPlaceholder extends React.Component {
  static randomNumberBetween(min, max) {
    return Math.floor((Math.random() * (max - (min + 1))) + min);
  }

  render() {
    const {
      isReady,
      children,
      width,
      height,
      lines,
      lineHeight,
    } = this.props;
    if (!isReady) {
      const p = [];
      const differ = 50;
      for (let i = 0; i < lines; i += 1) {
        const line = (
          <Line
            key={`line-${i}`}
            y={i * (height * lineHeight)}
            height={height}
            width={ParagraphPlaceholder.randomNumberBetween(width - differ, width + differ)}
          />
        );
        p.push(line);
      }
      return (
        <svg width={width + differ}>
          <g>
            {p}
          </g>
        </svg>
      );
    }
    return (
      <div>
        {children}
      </div>
    );
  }
}

const Line = ({ width, height, y }) => (
  <rect
    fill="#E5E5E5"
    className={styles.line}
    width={width}
    height={height}
    y={y}
  />
);

Line.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

ParagraphPlaceholder.propTypes = {
  isReady: PropTypes.bool,
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lines: PropTypes.number.isRequired,
  lineHeight: PropTypes.number.isRequired,
};

ParagraphPlaceholder.defaultProps = {
  isReady: false,
};

export default ParagraphPlaceholder;
