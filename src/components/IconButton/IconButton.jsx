import React from 'react';
import PropTypes from 'prop-types';
import s from './IconButton.module.css';

const IconButton = ({ children, ...allyProps }) => (
  <button type="submit" className={s.IconButton} {...allyProps}>
    {children}
  </button>
);

export default IconButton;

IconButton.propTypes = {
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};
