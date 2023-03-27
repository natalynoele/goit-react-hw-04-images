import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './searchbar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';
import { useState } from 'react';


const App = () => {

  const [searchText, setSearchText] = useState('');
  
  // state = {
  //   searchText: '',
  //   items: null,
  // };
 const handleFormSubmit =  searchValue => {
    setSearchText( searchValue );
  };
  
    return (
      <div className="PageContainer">
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery searchText={searchText} />       
        <ToastContainer />
      </div>
    );
  
}

export default App