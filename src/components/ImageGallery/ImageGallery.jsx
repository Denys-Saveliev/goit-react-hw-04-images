import { Component } from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Events, animateScroll as scroll } from 'react-scroll';

class ImageGallery extends Component {
  componentDidMount() {
    Events.scrollEvent.register('begin', function () {
      //console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function () {
      //console.log('end', arguments);
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.imageGalleryItems.length !== this.props.imageGalleryItems.length
    ) {
      scroll.scrollToBottom();
    }
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  onGalleryItemClick = id => {
    this.props.onGalleryItemClick(id);
  };

  render() {
    const { imageGalleryItems } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {imageGalleryItems.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            id={id}
            onItemClick={() => this.onGalleryItemClick(id)}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  imageGalleryItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onGalleryItemClick: PropTypes.func.isRequired,
};
