import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import fetchImages from 'services/Api';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import './Style_ImageGallery.scss';

const ImageGallery = ({ searchText }) => {
  const galleryEndRef = React.createRef();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    url: '',
    alt: '',
  });

  const scrollToBottom = () => {
    galleryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (url, alt) => {
    setIsShowModal(true);
    setSelectedImage({ url, alt });
  };

  const closeModal = () => {
    setIsShowModal(false);
    setSelectedImage({ url: '', alt: '' });
  };

  useEffect(() => {
    if (!searchText) return;
    setStatus('pending');
    fetchImages(searchText, page)
      .then(data => {
        if (!data.totalHits) {
          return Promise.reject(
            new Error(
              `There are not any images according the request ${searchText}`
            )
          );
        }
        setItems([...items, ...data.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    scrollToBottom();
  }, [page, searchText]);

  if (status === 'idle') {
    return (
      <div className="PageTitle">
        <h2>Are you looking for images? Just write down a request! </h2>
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="LoaderWrap">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#5957d0"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName="LoaderWrap"
          visible={true}
        />
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className="GalleryWrapper">
        <ul className="ImageGallery">
          {items.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                alt={tags}
                modalUrl={largeImageURL}
                clickImg={openModal}
              />
            );
          })}
        </ul>
        <div ref={galleryEndRef} />
        <Button click={handleLoadMore}>Load More</Button>

        {isShowModal && <Modal image={selectedImage} close={closeModal} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <p className="ErrorMessage">
        Whoops, something went wrong: {error.message}
      </p>
    );
  }
};

ImageGallery.propTypes = {
  searchText: PropTypes.string,
};
export default ImageGallery;
