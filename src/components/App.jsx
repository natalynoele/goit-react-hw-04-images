import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './searchbar/SearchBar';
// import ImageGallery from './imageGallery/ImageGallery';
import ImageGallery from './imageGallery/ImageGallery';
import { useState } from 'react';


const App = () => {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
 
 const handleFormSubmit =  searchValue => {
   setQuery(searchValue);  
  };
  
    return (
      <div className="PageContainer">
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery query={query} page={page} />       
        <ToastContainer />
      </div>
    );
  
}

export default App