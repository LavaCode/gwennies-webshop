import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingBag } from "react-icons/fa";
import Logo from '../../assets/logo/gwennies_logo.png';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  return (
    <>
      <nav className="navigation-bar">
        <NavLink exact to="/" className="logo" onClick={() => setClick(false)}>
            <img className="logo" src={Logo} alt="gw-logo"></img>
        </NavLink>
        <ul className={click ? "nav-links" : "nav-links close"}>
          <li><NavLink 
                to="/shop" 
                className="link" 
                activeClassName="active-link" 
                onClick={() => setClick(false)}
                >PRODUCTS</NavLink>
                </li>
          <li><NavLink 
                to="/contact" 
                className="link" 
                activeClassName="active-link"
                onClick={() => setClick(false)}
                >CONTACT</NavLink>
                </li>
          <li><NavLink 
                to="/login" 
                className="link login-button" 
                activeClassName="active-link"
                onClick={() => setClick(false)}
                >LOGIN</NavLink>
                </li>
          <li><NavLink 
                to="/cart" 
                className="link" 
                activeClassName="active-link"
                onClick={() => setClick(false)}
                ><FaShoppingBag size="1.3em" /></NavLink>
                </li>
        </ul> 
        <div className="nav-icon" onClick ={() => setClick(!click)}>
          <span className={click ? "fas fa-times" : "fas fa-bars"}></span>
          {click ? <FaTimes className="fa-times" /> : <FaBars className="fa-bars" />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;


