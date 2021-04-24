import React from 'react';
import Tile from '../../components/Tile/Tile';
import data from '../../content/data.json';

function Home() {
    return (
        <div className="home-container">
            <Tile
                className="tile-01"
                title="BRAND"
                text="Mollit magna fugiat et ex pariatur duis deserunt. Aliquip quis excepteur consectetur labore aute minim do sunt aliquip exercitation. Adipisicing officia pariatur ea ut ut aute eu nostrud laborum adipisicing. Irure aliquip nostrud cupidatat adipisicing consectetur exercitation velit. Anim nulla qui cillum sunt qui sint cillum est labore laboris."
            />
            <Tile
                className="tile-02"
                // image={brand}
            />
            <Tile
                className="tile-03"
                // image={story}
                />
            <Tile
                className="tile-04"
                title="OUR STORY"
                >
          <p className="footerText">Mollit magna fugiat et ex pariatur duis deserunt. Aliquip quis excepteur consectetur labore aute minim do sunt aliquip exercitation.</p>
          <p className="footerText">Yolo diabolo</p>
          </Tile>
        </div>
    )
}

export default Home
