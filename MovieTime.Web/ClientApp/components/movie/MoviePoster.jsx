import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './MoviePoster.scss';

class MoviePoster extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    this.attachLoadListener();
  }

  onLoad() {
    this.setState({
      isLoading: false,
    });
  }

  attachLoadListener() {
    if (this.image.complete) {
      this.onLoad();
    } else {
      this.image.addEventListener('load', this.onLoad);
    }
  }

  render() {
    if (this.props.onClick) {
      return (
        <div
          role="button"
          tabIndex="0"
          onClick={this.props.onClick}
          onKeyPress={this.props.onClick}
          className={cn(styles['movie-poster'], this.props.className)}
        >
          <img
            ref={(img) => {
              this.image = img;
            }}
            className="image"
            onLoad={() => this.onLoad()}
            src={this.props.source}
            alt={this.props.alt}
            style={{
              opacity: this.state.isLoading ? '0' : '1',
            }}
          />
        </div>
      );
    }
    return (
      <div className={cn(styles['movie-poster'], this.props.className)}>
        <img
          ref={(img) => {
            this.image = img;
          }}
          className="image"
          onLoad={() => this.onLoad()}
          src={this.props.source}
          alt={this.props.alt}
          style={{
           opacity: this.state.isLoading ? '0' : '1',
          }}
        />
      </div>
    );
  }
}

MoviePoster.propTypes = {
  source: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

MoviePoster.defaultProps = {
  alt: '',
  source: '',
  className: '',
  onClick: undefined,
};

export default MoviePoster;
