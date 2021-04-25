import React from 'react';
import Tile from '../../components/Tile/Tile';
import data from '../../content/data.json';


function Home() {
    return (
        <div className="home-container">
            <Tile
                className="tile-01"
                title={data.nl.brand.title}
                text={data.nl.brand.text}
            />
            <Tile
                className="tile-02"
                title="(hier komt een afbeelding)"
            />
            <Tile
                className="tile-03"
                title="(hier komt een afbeelding)"
                // image={story}
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
