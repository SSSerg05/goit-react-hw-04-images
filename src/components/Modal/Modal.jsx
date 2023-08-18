import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import { Loader } from "components/Loader/Loader";


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, tags, onClose }) => {


  const [loaded, setLoaded] = useState(false)

  // componentDidMount()
  useEffect(() => {
  
    // close modal for press in ESC
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        // console.log("You press ESC");
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    setLoaded(true);
    
    //componentWillUnmount() {
    return (() => { 
      window.removeEventListener('keydown', handleKeyDown)
    })
  },[onClose])


  const onLoadedLargeImage = () => {
    setLoaded(false);
  }


  // // close modal for press in ESC
  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     // console.log("You press ESC");
  //     onClose();
  //   }
  // }

  
  // close modal for click in backdrop || button
  const handleBackdropClick = e => { 
    if (e.currentTarget === e.target) { 
       onClose();
    }
  }

  return createPortal(
      <div className="Overlay" onClick={ handleBackdropClick }>
       
        <div className="BoxModal">

          {loaded && <Loader /> }
          
          <img className="Modal-image" onLoad={ onLoadedLargeImage } src={ src } alt={ tags } />
          
          {!loaded &&
            <button className="Modal-button-close" type="button" onClick={ handleBackdropClick }>
              Close
            </button>}
          
          { !loaded && 
            <div className="Modal-title">
              { tags }
            </div>
          }
        </div>
        
      </div>
  , modalRoot )
}

Modal.propTypes = {
  src : PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose : PropTypes.func.isRequired,
};