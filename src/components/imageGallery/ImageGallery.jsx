import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import fetchImages from 'services/Api';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';

import './Style_ImageGallery.scss';

class ImageGallery extends Component {
  state = {
    selectedImage: {
      url: '',
      alt: '',
    },
    status: 'idle',
    error: null,
    items: [],
    page: 1,
    isShowModal: false,
  };

  galleryEndRef = React.createRef();

  scrollToBottom = () => {
    this.galleryEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (url, alt) => {
    this.setState({ isShowModal: true, selectedImage: { url, alt } });
  };
  closeModal = () => {
    this.setState({ isShowModal: false, selectedImage: { url: '', alt: '' } });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchText;
    const nextSearch = this.props.searchText;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { page } = this.state;
    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      if (prevSearch !== nextSearch) {
        this.setState({ items: [], page: 1, totalPage:0 });
      }
      this.setState({ status: 'pending', visible: true });
      fetchImages(nextSearch, page)
        .then(data => {
          if (!data.totalHits) {
            return Promise.reject(
              new Error(
                `There are not any images according the request ${nextSearch}`
              )
            );
          }
          this.setState(prevState => ({
            items: [...prevState.items, ...data.hits],
            status: 'resolved',           
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    this.scrollToBottom();
  }

  render() {
    const { items, error, status, isShowModal } = this.state;
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
                  clickImg={this.openModal}
                />
              );
            })}
          </ul>
          <div ref={this.galleryEndRef} />
          <Button click={this.handleLoadMore}>Load More</Button>

          {isShowModal && (
            <Modal image={this.state.selectedImage} close={this.closeModal} />
          )}
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
  }
}

ImageGallery.propTypes = {
  searchText: PropTypes.string,
};
export default ImageGallery;
