import React from 'react';
import PropTypes from 'prop-types';

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
    return (
      <div className={styles['movie-poster']}>
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
};

MoviePoster.defaultProps = {
  alt: '',
  source: '',
};

export default MoviePoster;
