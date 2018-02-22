import React from 'react';
import Icon from '../icon/Icon';

import styles from './MovieHeading.scss';

const MovieHeading = props => (
  <div className="movie-heading">
    <h2>{props.title}</h2>
    <ul className={styles['movie-heading']} >
      <li><Icon type="star" /> 8 / 10</li>
      <li><Icon type="clock-o" /> 2h 10m</li>
      <li><Icon type="film" /> Action, Adventure, Comedy</li>
    </ul>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed fringilla odio, vel aliquet lorem. Cras suscipit eros vel risus cursus euismod. Vivamus at aliquam leo, scelerisque molestie lectus. Aenean nec tortor a ligula sodales suscipit. Pellentesque at ipsum non purus dictum blandit. Vestibulum vel mi bibendum erat molestie luctus. Proin non leo a libero fermentum posuere sit amet vitae mauris. Morbi sapien ipsum, feugiat ac leo sit amet, pulvinar auctor massa. Cras pellentesque semper purus, at faucibus velit placerat vel. Vestibulum eget quam non lorem eleifend viverra eget nec mi. Vestibulum eros lectus, vestibulum id risus at, tristique commodo orci. Sed dui lectus, mollis ut sem ut, semper convallis erat. Vivamus tristique felis id quam euismod consequat in sit amet lorem. Praesent ac fringilla turpis.</p>
  </div>
);

export default MovieHeading;
