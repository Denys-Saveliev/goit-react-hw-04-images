import React from 'react';
import s from './LoadMore.module.css';
import PropTypes from 'prop-types';

const LoadMore = ({ onClick }) => (
  <button type="button" onClick={onClick} className={s.Button}>
    Load more
  </button>
);

export default LoadMore;

LoadMore.propTypes = { onClick: PropTypes.func.isRequired };
