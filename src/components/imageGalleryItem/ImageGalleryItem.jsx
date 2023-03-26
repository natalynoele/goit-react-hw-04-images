import { Component } from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../images/default_img.jpg';
import './Style_ImageGalleryItem.scss';

class ImageGalleryItem extends Component {
  state = {
      isLoaded: false
  }
  render() {
    
    const {url, alt, modalUrl, clickImg} = this.props
    return (
      <li
        className="ImageGalleryItem"
        onClick={() => {
          clickImg(modalUrl, alt);
        }}
      >
        {!this.state.isLoaded && (
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
            this.setState({ isLoaded: true });

            console.log('test');
          }}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
  clickImg: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
