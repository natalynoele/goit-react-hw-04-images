
import PropTypes from 'prop-types';
import { useState } from 'react';
import defaultImage from '../../images/default_img.jpg';
import './Style_ImageGalleryItem.scss';

const ImageGalleryItem = ({ url, alt, modalUrl, clickImg }) => {
  const [isLoaded, setIsLoaded] = useState(false);
 
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        clickImg(modalUrl, alt);
      }}
    >
      {!isLoaded && (
        <img
          src={defaultImage}
          alt={alt}
          className="ImageGalleryItem-default"
        />
      )}
      <img
        src={url}
        alt={alt}
        className="ImageGalleryItem-image"
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
  clickImg: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
