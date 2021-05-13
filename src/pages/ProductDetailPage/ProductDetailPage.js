import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import content from '../../content/products.json';
import temp_image from '../../content/images/bag_1.jpg';
import './ProductDetailPage.css'; 

function ProductDetailPage() {
    const history = useHistory();
    const { id } = useParams();
    const { addItem } = useContext(ShopContext);
    const data = content.items.find(element => element.id === id)

    function handleClick() {
        history.push('/shop');
    }

    return (
        <div className="page-container">
            <div className="product-detail-container">
            <img src={temp_image} alt="Product image" className="product-detail-image"></img>
                <div className="select-image-container">
                    <ul className="select-image">
                        <img src={temp_image} alt="Product image" className="product-detail-image-small"></img>
                        <img src={temp_image} alt="Product image" className="product-detail-image-small"></img>
                        <img src={temp_image} alt="Product image" className="product-detail-image-small"></img>
                    </ul>
                </div>
                <h1 className="detail-title">{data.title}</h1>
                <h1>{data.shortDescription}</h1>
                <p>€ {data.price}</p>
                <button className="add-to-cart-detail" onClick={addItem}>ADD TO CART</button>
                <button className="return-button" onClick={handleClick}>BACK</button>
            </div>
        </div>
    )
}

export default ProductDetailPage