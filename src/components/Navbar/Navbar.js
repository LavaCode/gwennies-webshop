import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingBag } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext';
import { ShopContext } from '../../context/ShopContext';
import { LanguageContext } from '../../context/LanguageContext';
import Logo from '../../assets/logo/gwennies_logo.png';
import data from '../../content/data.json';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { item } = useContext(ShopContext);
  const { language } = useContext(LanguageContext);

  return (
    <>
      <nav className="navigation-bar">
        <NavLink exact to="/" className="logo" onClick={() => setClick(false)}>
            <img className="logo" src={Logo} alt="gw-logo"></img>
        </NavLink>
        <ul className={click ? "nav-links" : "nav-links close"}>
          <li><NavLink 
                to="/shop" 
                className="item" 
                activeClassName="active-link" 
                onClick={() => setClick(false)}
                >{data.navigation[language].products}</NavLink>
              </li>
          <li><NavLink 
                to="/contact" 
                className="item" 
                activeClassName="active-link"
                onClick={() => setClick(false)}
                >{data.navigation[language].contact}</NavLink>
              </li>
            {user && 
            <li><NavLink 
                to="/profile" 
                className="item"  
                activeClassName="active-link"
                onClick={() => setClick(false)}
                >{data.navigation[language].profile}</NavLink>
              </li>
            }
          { user 
          ? 
          <li><NavLink
            to="/"
            className="item" 
              onClick={() => {
              setClick(false);
              logout();
              }}
              >{data.navigation[language].logout}</NavLink>
            </li>
          :
            <li>
              <NavLink 
                to="/login" 
                className="item" 
                activeClassName="active-link"
                onClick={() => setClick(false)}
                >{data.navigation[language].login}</NavLink>
            </li> 
          } 
          <li>
            <NavLink 
                to="/cart" 
                className="shopping-bag"  
                activeClassName="active-link"
                onClick={() => setClick(false)}
                ><FaShoppingBag size="1.3em"></FaShoppingBag>
                  <div className="cart-icon">
                    <p className="cart-amount">{item}</p>
                  </div>
                </NavLink>
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


