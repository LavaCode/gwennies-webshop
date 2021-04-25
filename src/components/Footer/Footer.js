import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import Dutch from '../../assets/flags/netherlands.png';
import data from '../../content/data.json';
import './Footer.css';

function Footer() {
    return (
            <div className="footer-copyright">
                <div className="footer-social">
                    <FaInstagram className='social-icon' onClick={() => window.open(data.social['instagram-url'])}/>
                </div>
                    <span className="footer-text"><strong>GWENNIES</strong> © Copyright 2021</span>
                <div className="footer-language">
                    <img src={Dutch} className='language-icon'></img>
                </div>
            </div>
    )
}

export default Footer
