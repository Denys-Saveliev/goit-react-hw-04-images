import React from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ children }) => (
  <header className={s.Searchbar}>{children}</header>
);

export default Searchbar;

Searchbar.propTypes = {
  children: PropTypes.node.isRequired,
};
