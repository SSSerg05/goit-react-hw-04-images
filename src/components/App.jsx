import React, { useState, useEffect } from "react";

import "../index.css"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';

// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { fetchData } from '../services/Api';


export const App = () => {
  
  const [imagesGallery, setImagesGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [tagsSelectedImage, setTagsSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  //componentDidUpdate
  useEffect(() => {
      if (!searchQuery) {
        return
      } 
      setIsLoading(true);
      // setError(null);

    async function fetchImages() {
      try {
        const data = await fetchData(searchQuery, page);
        if (data.hits.length === 0) {
          throw new Error("Gallery empty");
        }
        setImagesGallery(prevImagesGallery => [...prevImagesGallery, ...data.hits])
        setTotal(prevTotal => data.totalHits);
      } catch (error) {
        // setError(error.message);
        onError(error.message);
      }
      finally {
        setIsLoading(false);
      }
      return;
    }

    fetchImages();
  }, [page, searchQuery])


  const onSelectImage = (link, tags) => {
    setSelectedImage(link)
    setTagsSelectedImage(tags);
    toggleModal();
  }


  const onLoadMore = () => {
    setPage(page + 1)
  }


  // container Toast in component Searchbar
  const onError = (error) => {
    toast.error(error);
    console.log(error);
  }


  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImagesGallery([]);
    setPage(1);
    setTotal(0);
  }

  // відкриття / закриття модалки
  const toggleModal = () => {
    setShowModal(!showModal)
  }


  return (
    <div className="App">
      
      <Searchbar onSubmit={ handleFormSubmit } />


      {isLoading && <Loader />}


      {(imagesGallery.length > 0) && <ImageGallery
        gallery={imagesGallery}
        onSelect={onSelectImage}
      />
      }


      {!isLoading && imagesGallery.length < total && (
        <button className="Button" type="button" onClick={onLoadMore}>
          Load More
        </button>
      )}

       
      {showModal && (
        <Modal
          src={selectedImage}
          tags={tagsSelectedImage}
          onClose={toggleModal}
        />
      )}
        
    </div>
    
  )
};


//
// export class App extends Component {
  
//   state = {
//     imagesGallery: [], // dataGallery.hits,
//     searchQuery: null,
//     selectedImage: null,
//     showModal: false,
//     isLoading: false,
//     error: null,
//     page: 1,
//     total: 0,
//   }


//   async componentDidUpdate(prevProps, prevState) {
//     const { page: prevPage, searchQuery: prevQuery, } = prevState;
//     const { page: nextPage, searchQuery: nextQuery, } = this.state;

//     // console.log(prevQuery, nextQuery, prevPage, nextPage);
//     if (prevQuery !== nextQuery || prevPage !== nextPage) {

//       this.setState({ isLoading: true, error: null });

//       try {
//         const data = await fetchData(nextQuery, nextPage); 

//         if (data.hits.length === 0) {
//           throw new Error("Gallery empty");
//         }

//         this.setState(
//           ( prevState ) => ({
//             imagesGallery: [ ...prevState.imagesGallery, ...data.hits],
//             total: data.totalHits,
//           })
//         )

//       } catch (error) {
//         this.setState({ error: error.message });
//         this.onError(error.message);
//       }
//       finally {
//         this.setState({ isLoading: false });
//       }
//       return
//     }  

//   }

//   onSelectImage = (link, tags) => { 
//     this.setState({
//       selectedImage: link,
//       tagsSelectedImage: tags,
//     });
//     this.toggleModal();
//   }


//   onLoadMore = () => {
//     this.setState(prevState => ({ 
//       page: prevState.page + 1,
//     }))
//   }


//   // container Toast in component Searchbar
//   onError = (error) => {
//     toast.error(error);
//     console.log(error);
//   }


//   handleFormSubmit = searchQuery => { 
//     this.setState({ searchQuery, imagesGallery: [], page: 1, total: 0 })
//   }

//   // відкриття / закриття модалки
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal
//     }))
//   }

//   render() {
//     const {
//       imagesGallery,
//       selectedImage,
//       tagsSelectedImage,
//       showModal,
//       isLoading,
//       total,
//     } = this.state; 

//     return (
//       <div className="App">
      
//         <Searchbar onSubmit={this.handleFormSubmit} />


//         { isLoading && <Loader/> }


//         {(imagesGallery.length > 0) && <ImageGallery
//             gallery={ imagesGallery }
//             onSelect={ this.onSelectImage }
//             />
//         }


//         { !isLoading && imagesGallery.length < total && (
//           <button className="Button" type="button" onClick={ this.onLoadMore }>
//             Load More
//           </button>
//         )}

       
//         { showModal && (
//             <Modal
//               src={ selectedImage }
//               tags={ tagsSelectedImage }
//               onClose={ this.toggleModal }
//             /> 
//         )}
        
//       </div>
//     );

//   }
// };