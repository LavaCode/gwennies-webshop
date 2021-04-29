import React, { useState, useEffect } from 'react';
import './Product.css'

function Product( {image, title, description, price} ) {
    const [loading, toggleLoading] = useState(false); 

    return (
        <div className="product">
        {loading && <span class="loading-data">Data wordt geladen...</span>}
        <img className="product-image" alt="Product image" src={image} />
        <p className="product-title">{title}</p>
        <p className="product-description">{description}</p>
        <br></br>
        <p className="product-price">{price}</p>
        <button className="add-to-cart">Add to cart</button>
      </div>
    )
}

export default Product
