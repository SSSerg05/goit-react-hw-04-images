import React, { Component } from "react";

import "../index.css"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';

// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { fetchData } from '../services/Api';


export class App extends Component {
  
  state = {
    imagesGallery: [], // dataGallery.hits,
    searchQuery: null,
    selectedImage: null,
    showModal: false,
    isLoading: false,
    error: null,
    page: 1,
    total: 0,
  }


  async componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, searchQuery: prevQuery, } = prevState;
    const { page: nextPage, searchQuery: nextQuery, } = this.state;

    // console.log(prevQuery, nextQuery, prevPage, nextPage);
    if (prevQuery !== nextQuery || prevPage !== nextPage) {

      this.setState({ isLoading: true, error: null });

      try {
        const data = await fetchData(nextQuery, nextPage); 

        if (data.hits.length === 0) {
          throw new Error("Gallery empty");
        }

        this.setState(
          ( prevState ) => ({
            imagesGallery: [ ...prevState.imagesGallery, ...data.hits],
            total: data.totalHits,
          })
        )

      } catch (error) {
        this.setState({ error: error.message });
        this.onError(error.message);
      }
      finally {
        this.setState({ isLoading: false });
      }
      return
    }  

  }

  onSelectImage = (link, tags) => { 
    this.setState({
      selectedImage: link,
      tagsSelectedImage: tags,
    });
    this.toggleModal();
  }


  onLoadMore = () => {
    this.setState(prevState => ({ 
      page: prevState.page + 1,
    }))
  }


  // container Toast in component Searchbar
  onError = (error) => {
    toast.error(error);
    console.log(error);
  }


  handleFormSubmit = searchQuery => { 
    this.setState({ searchQuery, imagesGallery: [], page: 1, total: 0 })
  }

  // відкриття / закриття модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const {
      imagesGallery,
      selectedImage,
      tagsSelectedImage,
      showModal,
      isLoading,
      total,
    } = this.state; 

    return (
      <div className="App">
      
        <Searchbar onSubmit={this.handleFormSubmit} />


        { isLoading && <Loader/> }


        {(imagesGallery.length > 0) && <ImageGallery
            gallery={ imagesGallery }
            onSelect={ this.onSelectImage }
            />
        }


        { !isLoading && imagesGallery.length < total && (
          <button className="Button" type="button" onClick={ this.onLoadMore }>
            Load More
          </button>
        )}

       
        { showModal && (
            <Modal
              src={ selectedImage }
              tags={ tagsSelectedImage }
              onClose={ this.toggleModal }
            /> 
        )}
        
      </div>
    );

  }
};
