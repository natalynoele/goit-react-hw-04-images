import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai'
import './Style_SearchBar.scss';

const SearchBar = ({ onSubmit }) => {  
  
  const [searchText, setSearchText] = useState('');
 
  const handleSubmit = evt => {
    evt.preventDefault();
    if (searchText.trim() === '') {
      toast('Please, write down a search query');
      return;
    }
    onSubmit(searchText);
    setSearchText('');
  };

  const handleChange = ({ currentTarget }) => {
    setSearchText(currentTarget.value.toLowerCase());
  };
  
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchText}
            onChange={handleChange}
          />
          <button type="submit" className="SearchForm-button">
            <i>
              <AiOutlineSearch />
            </i>
            <span className="SearchForm-button-label">Search</span>
          </button>
        </form>
      </header>
    );
  
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
};

export default SearchBar;
