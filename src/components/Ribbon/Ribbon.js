import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext'
import data from '../../content/data.json'
import './Ribbon.css'

function Ribbon() {
    const { language } = useContext(LanguageContext);

    return (
        <div className="ribbon-container">
            <ul className="ribbon-items">
                <li className="ribbon-item">{data.ribbon[language].one}</li>
                <li className="ribbon-item">{data.ribbon[language].two}</li>
                <li className="ribbon-item">{data.ribbon[language].three}</li>
            </ul>
        </div>
    )
}

export default Ribbon
