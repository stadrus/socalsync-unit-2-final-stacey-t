import { Link } from "react-router-dom"
import logo from "../../images/logo.svg"
import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div>
            <header className="header">
            <nav>
                <img className="logo" src={logo} alt="SoCalSync Logo" />
                <input type="checkbox" id="check" className="menu-toggle" /> 
                <label htmlFor="check" className="checkbtn">  
                    <FontAwesomeIcon icon={faBars} />
                </label>
                <div className="nav-mobile">
                    <Link to="/" className="home-button">Home</Link>
                    <Link to="/about" className="about-button">About Us</Link>
                </div>
            </nav>
            </header>
        </div>
    );
};

export default Header;
