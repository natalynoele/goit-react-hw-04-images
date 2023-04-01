import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import fetchImages from 'services/Api';
import GalleryList from 'components/galleryList/GalleryList';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import './Style_ImageGallery.scss';

const ImageGallery = ({ query }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    url: '',
    alt: '',
  });

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
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
    setPage(1);
    setItems([]);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    setStatus('pending');
    fetchImages(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          setStatus('rejected');
          return Promise.reject(
            new Error(
              `There are not any images according to the request ${query}`
            )
          );
        }

        setItems(prevState => [...prevState, ...data.hits]);
        setStatus('resolved');

        if (items.length > 0 && items.length === data.totalHits) {
          setIsLoad(false);
          setIsEnd(true)
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, query]);

  if (status === 'idle') {
    return (
      <div className="PageTitle">
        <h2>Are you looking for images? Just write down a request! </h2>
      </div>
    );
  }

  if (status === 'pending' && items.length === 0) {
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

  if (status === 'pending' && items.length > 0) {
    return (
      <div className="GalleryWrapper">
        <GalleryList items={items} openModal={openModal} />
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
        <Button click={handleLoadMore}>Loading</Button>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className="GalleryWrapper">
        <GalleryList items={items} openModal={openModal} />

        {isLoad && <Button click={handleLoadMore}>Load More</Button>}
        {isEnd && toast.info('You reached the end of the collection') && (
          <p>You reached the end of the collection</p>
        )}
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
  query: PropTypes.string,
};
export default ImageGallery;
