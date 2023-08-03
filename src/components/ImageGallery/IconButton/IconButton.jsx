import PropTypes from "prop-types"

export const IconButton = ({children, onClick, ...allyProps}) => {
  return (
    <button className="icon-button" type="button" onClick={onClick} {...allyProps}>
      { children }
    </button>
  )
}

IconButton.defaultProps ={
  children: null,
  onClick: () => null,
}

IconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
}