import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import data from '../../content/data.json';
import './Footer.css';

function Footer() {
    return (
        <div>
            <div className="footer-copyright">
                <div className="footer-social">
                    <FaInstagram className='social-icon' onClick={() => window.open(data.social['instagram-url'])}/>
                </div>
                    <span className="footer-text"><strong>GWENNIES</strong> © Copyright 2021</span>
            </div>
        </div>
    )
}

export default Footer
