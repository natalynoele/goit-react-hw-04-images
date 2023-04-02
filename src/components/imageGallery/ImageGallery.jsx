import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import GalleryList from 'components/galleryList/GalleryList';
import Header from 'components/header/Header';
import fetchImages from 'services/Api';
import './Style_ImageGallery.scss';
const ImageGallery = ({ query }) => {
  const perPage = 12;
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [isEndOfCollection, setIsEndOfCollection] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
    const [counterPage, setCounterPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState({
    url: '',
    alt: '',
  });


  const openModal = (url, alt) => {
    setIsShowModal(true);
    setSelectedImage({ url, alt });
  };

  const closeModal = () => {
    setIsShowModal(false);
    setSelectedImage({ url: '', alt: '' });
  };

  
  const handleLoadMore = page => {
    getImages(page);
      setCounterPage(page);
  };

  useEffect(() => {
    setItems([]);
    setIsLoad(true);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    setStatus('pending');
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const getImages = async (page=1) => {
   try {
     const images = await fetchImages(query, page, perPage);
     const data = await images.hits;
     if (data.length === 0) {
       setStatus('rejected');
       setIsLoad(false);
       throw new Error(`Sorry, there are no images for the request ${query}`);
     }
    
     if (total > 0 && items.length + perPage >= images.totalHits) {
       setIsLoad(false);
       setIsEndOfCollection(true);
       toast.info("We're sorry, but you've reached the end of search results.");
     }
     setItems(prevState => [...prevState, ...data]);
     setStatus('resolved');
     setTotal(images.totalHits);
   } catch (error) {
     setStatus('rejected');
     setError(error);
   }
 };
 

  if (status === 'idle') {
    return (
      <Header title="Are you looking for images? Just write the request!" />
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Header title="Loading..." />
        <div className="GalleryWrapper">
          {items.length >0 && (
            <GalleryList items={items} openModal={openModal} />
          )}
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
          {items.length > 0 && <Button click={handleLoadMore}>Loading</Button>}
        </div>
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Header
          title={`We found ${total} images for your request "${query}"`}
        />
        <div className="GalleryWrapper">
          <GalleryList items={items} openModal={openModal} />

          {isLoad && (
            <Button click={handleLoadMore} pages={counterPage}>
              Load More
            </Button>
          )}
          {isEndOfCollection && (
            <p>
              This is the end of the collection. Didn't find anything you like
              to? Just try another request!
            </p>
          )}
          {isShowModal && <Modal image={selectedImage} close={closeModal} />}
        </div>
      </>
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
