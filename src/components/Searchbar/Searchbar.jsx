import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ onSubmit }) => { 

  const[searchQuery, setSearchQuery] = useState("");


  const handleChangeSearchQuery = event => {
    setSearchQuery( event.currentTarget.value.toLowerCase() )
  }


  const handleSubmit = event => { 
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.error('No search query');
      
    }

    onSubmit(searchQuery);
    setSearchQuery("");
  }


  return (
    <div className="Searchbar">
      <form className="SearchForm" onSubmit={ handleSubmit }>
          <input
            className="SearchForm-input"
            type="text"
            name="searchQuery"
            value={ searchQuery }
            onChange={ handleChangeSearchQuery }
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos: HW-4 Hook"
          />
        <button className="SearchForm-button" type="submit">
          <ImSearch />
        </button>
        <ToastContainer
          autoClose={2500}
          theme="colored"/>
      </form>
    </div>
  )
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchQuery : PropTypes.string,
};