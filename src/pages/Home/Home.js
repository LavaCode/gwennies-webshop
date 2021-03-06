import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import Tile from '../../components/Tile/Tile';
import data from '../../content/data.json';
import brand from '../../assets/other/brand.jpeg';
import our_story from '../../assets/other/our_story.jpeg';
import './Home.css';


function Home() {
    const { language } = useContext(LanguageContext);

    return (
        <div className="home-container">
                <Tile
                    className="tile image"
                    image={brand}
                />
                <Tile
                    className="tile"
                    title={data.homepage[language].brand.title}
                    text={data.homepage[language].brand.text}
                />
                <Tile
                    className="tile"
                    title={data.homepage[language].aboutUs.title}
                    text={data.homepage[language].aboutUs.text}
                />
                <Tile
                    className="tile image"
                    image={brand}
                />
                <Tile
                    className="tile image"
                    image={our_story}
                />
        </div>
    )
}

export default Home
