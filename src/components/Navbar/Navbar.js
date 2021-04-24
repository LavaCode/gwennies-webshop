import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from '../../assets/logo/gwennies_logo.png';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  return (
    <>
      <nav>
        <NavLink exact to="/" className="logo">
            <img className="logo" src={Logo}></img>
        </NavLink>
        <ul className={click ? "navbar" : "navbar close"}>
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
        </ul> 
        <div className="nav-icon" onClick ={() => setClick(!click)}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          {click ? <FaTimes className="fa-times" /> : <FaBars className="fa-bars" />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
