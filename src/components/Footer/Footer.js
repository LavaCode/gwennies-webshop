import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { FaInstagram } from 'react-icons/fa';
import { ReactComponent as Dutch } from '../../assets/flags/netherlands.svg';
import { ReactComponent as English } from '../../assets/flags/united-kingdom.svg';
import data from '../../content/data.json';
import './Footer.css';

function Footer() {
    const { language, changeLanguage } = useContext(LanguageContext);

    return (
            <div className="footer-container">
                <div className="footer-social">
                    <FaInstagram className='social-icon' onClick={() => window.open(data.social['instagram-url'])}/>
                </div>
                    <span className="footer-text"><strong>GWENNIES</strong> © Copyright 2021</span>
                <div className="footer-language">
                    {language === 'nl' ? <English onClick={changeLanguage} className="language-icon" /> : <Dutch onClick={changeLanguage} className="language-icon" />}
                </div>
            </div>
    )
}

export default Footer;

