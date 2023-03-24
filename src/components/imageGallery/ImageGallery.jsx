import { Component } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    selectedImage: '',
    error: null,
    items: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.searchText;
    const nextSearch = this.props.searchText;
    if (prevSearch !== nextSearch) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${nextSearch}&page=1&key=33300919-40929e674b87413f155229e92&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              `There are not any images according the request ${nextSearch}`
            )
          );
        })
        .then(data => this.setState({ items: data.hits, status:  'resolved'}))
        .catch(error => this.setState({ error, status: 'rejected' }))
        
    }
  }
  render() {
    const { items, isLoading, error, status } = this.state;

    if (status === 'idle') {
      return <div>Write down a request</div>
    }
    if (status === 'pending') {
  return <ClipLoader size={75} color="#2c6ae8" loading={true} />;
    }
    
    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {items.map(({ id, previewURL, tags }) => (
            <ImageGalleryItem key={id} url={previewURL} alt={tags} />
          ))}
        </ul>
      );
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>
    }
  }
}

export default ImageGallery;
