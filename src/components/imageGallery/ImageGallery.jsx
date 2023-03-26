import { Component } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import fetchImages from 'services/Api';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import './Style_ImageGallery.scss';

class ImageGallery extends Component {
  state = {
    selectedImage: {
      url: '',
      alt: '',
    },
    error: null,
    items: [],
    status: 'idle',
    page: 1,
    isShowModal: false,
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModal = (url, alt) => {
    this.setState({ isShowModal: true, selectedImage: { url, alt } });
  };
  closeModal = () => {
    this.setState({ isShowModal: false, selectedImage: { url: '', alt: '' } });
  };

  scrollToTop = () => {
const body = document.querySelector('#root');

body.scrollIntoView(
  {
    behavior: 'smooth',
  },
  500
);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchText;
    const nextSearch = this.props.searchText;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { page } = this.state;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      if (prevSearch !== nextSearch) {
        this.setState({ items: [], page: 1 });
      }
      this.setState({ status: 'pending' });
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
  }

  render() {
    const { items, error, status, isShowModal, selectedImage } = this.state;
    if (status === 'idle') {
      return (
        <div className="PageTitle">
          <h2>Are you looking for images? Just write down a request! </h2>
        </div>
      );
    }
    if (status === 'pending') {
      return <ClipLoader size={75} color="#2c6ae8" loading={true} />;
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
                  clickImg={this.handleModal}
                />
              );
            })}
          </ul>
          <Button click={this.handleLoadMore}>Load More</Button>
          <Button click={this.scrollToTop}>
            Up <BsFillArrowUpCircleFill />
          </Button>

          {isShowModal && (
            <Modal image={this.state.selectedImage} close={this.closeModal} />
          )}
        </div>
      );
    }
    if (status === 'rejected') {
      return <p className="ErrorMessage">Whoops, something went wrong: {error.message}</p>;
    }
  }
}

ImageGallery.propTypes = {
  searchText: PropTypes.string,
};
export default ImageGallery;
