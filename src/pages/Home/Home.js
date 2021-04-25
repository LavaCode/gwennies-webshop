import React from 'react';
import Tile from '../../components/Tile/Tile';
import data from '../../content/data.json';
import brand from '../../assets/other/brand.jpeg';
import our_story from '../../assets/other/our_story.jpeg';
import './Home.css';


function Home() {
    return (
        <div className="home-container">
                <Tile
                    className="tile-02"
                    image={brand}
                />
                <Tile
                    className="tile-01"
                    title={data.nl.brand.title}
                    text={data.nl.brand.text}
                />
                <Tile
                    className="tile-03"
                    image={our_story}
                />
                <Tile
                    className="tile-04"
                    title={data.nl.aboutUs.title}
                    text={data.nl.aboutUs.text}
                />
        </div>
    )
}

export default Home
