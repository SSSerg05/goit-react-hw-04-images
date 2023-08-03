import { ItemGallery } from "./ItemGallery/ItemGallery"
import PropTypes from 'prop-types';


export const ImageGallery = ({ gallery, onSelect }) => { 


  return (
    <ul className="ImageGallery">
      {
        gallery.map(item =>
          <li key={item.id} onClick={() => onSelect(item.largeImageURL, item.tags)}>
            <ItemGallery
              src={item.webformatURL}
              alt={item.tags}
            />
          </li>
        )
      }
    </ul>
  );
}

ImageGallery.propTypes = {
  onSelect: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};