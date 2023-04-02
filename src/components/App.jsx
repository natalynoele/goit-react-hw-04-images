import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './searchbar/SearchBar';
import ImageGallery from './imageGallery/ImageGallery';



const App = () => {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (searchValue) => {
    setQuery(searchValue);
   
    
  };

  return (
    <div className="PageContainer">
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} /> 
       <ToastContainer />
    </div>
  );
};

export default App;
