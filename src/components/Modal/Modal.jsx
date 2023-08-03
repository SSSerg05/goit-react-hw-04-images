import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import { Loader } from "components/Loader/Loader";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  state = {
    loaded: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);

    this.setState({ loaded: true });
  }

  onLoadedLargeImage = () => {
    this.setState({ loaded: false });
  }


  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }


  // close modal for press in ESC
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log("You press ESC");
      this.props.onClose();
    }
  }

  
  // close modal for click in backdrop || button
  handleBackdropClick = e => { 
    if (e.currentTarget === e.target) { 
       this.props.onClose();
    }
  }


  render() {
    const { src, tags } = this.props;
    const { loaded } = this.state;
    
    return createPortal(
      <div className="Overlay" onClick={ this.handleBackdropClick }>
       
        <div className="BoxModal">

          {loaded && <Loader /> }
          
          <img className="Modal-image" onLoad={ this.onLoadedLargeImage } src={ src } alt={ tags } />
          
          {!loaded &&
            <button className="Modal-button-close" type="button" onClick={this.handleBackdropClick}>
              Close
            </button>}
          
          { !loaded && 
            <div className="Modal-title">
              { tags }
            </div>
          }
        </div>
        
      </div>
    , modalRoot)
  };
}

Modal.propTypes = {
  src : PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose : PropTypes.func.isRequired,
};