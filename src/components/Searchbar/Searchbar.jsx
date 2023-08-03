import React, { Component } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component { 

  state = {
    searchQuery : "",
  }


  handleChangeSearchQuery = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() })
  }


  handleSubmit = event => { 
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('No search query');
      
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" })
  }


  render() { 
    const { searchQuery } = this.state;
    return (
      <div className="Searchbar">
        <form className="SearchForm" onSubmit={ this.handleSubmit }>
            <input
              className="SearchForm-input"
              type="text"
              name="searchQuery"
              value={ searchQuery }
              onChange={ this.handleChangeSearchQuery }
              // autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchQuery : PropTypes.string,
};