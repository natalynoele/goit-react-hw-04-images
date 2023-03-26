import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai'
import './Style_SearchBar.scss';

class SearchBar extends Component {
  state = {
    searchText: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchText.trim() === '') {
      toast('Please, write down a search query');
      return;
    }
    this.props.onSubmit(this.state.searchText);
    this.setState({
      searchText: '',
    });
  };

  handleChange = ({ currentTarget }) => {
    this.setState({ searchText: currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.handleChange}
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
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired, 
};

export default SearchBar;
