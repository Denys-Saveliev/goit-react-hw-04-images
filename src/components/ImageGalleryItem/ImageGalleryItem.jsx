import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, tags, onItemClick }) => (
  <li className={s.ImageGalleryItem} onClick={() => onItemClick(id)}>
    <img src={webformatURL} alt={tags} className={s.ImageGalleryItem__image} />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
