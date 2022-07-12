import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imgs, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {imgs.map(img => {
        return (
          <li key={img.id}>
            <ImageGalleryItem
              url={img.webformatURL}
              largeImageURL={img.largeImageURL}
              onClick={onClick}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
