// Card Component to display on pages
// this component can be used on any page that imports it
import PropTypes from "prop-types"

function Card({ children , reverse , color}) 
{
    
  return (
    <div className={`card ${reverse && "reverse"} ${color}`}>{children}</div>
  )
}

// default values
Card.defaultProps = {
    reverse: false,
    color: '',
}

// set a data type for each variable
Card.propTypes = {
    reverse: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

export default Card