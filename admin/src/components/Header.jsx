import PropTypes from 'prop-types'
import { useNavigate , Link } from 'react-router-dom';
import { useEffect , useState } from 'react';
import "../assets/style/index.css"

function Header({ type , bgColor, textColor , currentPage }) {
    const [pages , setPages] = useState([]);
    var navigate = useNavigate();
    const HeaderStyle = {
        backgroundColor: bgColor,
        color: textColor
    }
    // Add additional navigation links as needed
    useEffect(() => {
        // Helper to determine if the link is active
        const isActive = (page) => currentPage === page;
        if (type === "athlete") {
            setPages([<Link to='/opportunityBoard' className={isActive('opportunityPage') ? 'active' : ''}>Opportunity Board</Link>]);
        }
        else {
            setPages([<Link to='/opportunityBoard' className={isActive('opportunityPage') ? 'active' : ''}>Opportunity Board</Link>, 
            <Link to='/opportunityForm' className={isActive('createPage') ? 'active' : ''}>Create Oppportunity</Link>]);
        }

    }, [ ]);

  return (
    <header style={HeaderStyle}>
            <nav className='navbar'>
                <div className='brand-title'>Athlete Reserve</div>
                <div className='navbar-links'>
                    {pages.map((page) => (page))}
                </div>
                <div className='profile-link'>Profile</div>
            </nav>
    </header>
  )
}

//default props values
Header.defaultProps = {
    currentPage: "Feedback UI",
    bgColor: "#18252A",
    textColor: "#fff",
    type: "brand",
}

// Type checking props
Header.propTypes = {
    currentPage: PropTypes.string,
}

export default Header