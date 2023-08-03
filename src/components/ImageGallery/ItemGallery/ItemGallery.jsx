import PropTypes from 'prop-types';

export const ItemGallery = ({ src, alt }) => { 

  return (
    <div className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={ src } alt={ alt } />
    </div>
  );
  
}

ItemGallery.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};