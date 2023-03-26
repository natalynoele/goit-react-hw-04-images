import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './searchbar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';


class App extends Component {
  state = {
    searchText: '',
    items: null,
  };
  handleFormSubmit =  searchText => {
    this.setState({ searchText });
  };

 

  render() {
    return (
      <div className="PageContainer">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchText={this.state.searchText} />       
        <ToastContainer />
      </div>
    );
  }
}

export default App