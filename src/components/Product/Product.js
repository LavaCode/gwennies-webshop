
import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { useHistory } from 'react-router-dom';
import './Product.css'

function Product( {id, image, title, description, price} ) {
    const { addItem } = useContext(ShopContext);
    const history = useHistory();

    function navigateToDetailPage() {
        history.push(`/shop/${id}`)
    }

    return (
        <div className="product">
            <img className="product-image" alt="Product" src={image} onClick={navigateToDetailPage}/>
            <p className="product-title">{title}</p>
            <p className="product-description">{description}</p>
            <br></br>
            <p className="product-price">€ {price}</p>
            <button className="add-to-cart" onClick={addItem}>Add to cart</button> 
        </div>
    )
}

export default Product;
